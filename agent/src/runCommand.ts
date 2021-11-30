import util from 'util';
import cp from 'child_process';
const exec = util.promisify(cp.exec);

type runCommandOptions = {
  serverId: string;
  command: string;
};

interface runCommandInterface {
  (opts: runCommandOptions): Promise<any>;
}

export const runCommand: runCommandInterface = async ({
  serverId,
  command,
}) => {
  const { stdout } = await exec(
    `screen -ls | grep -oE "[0-9]+\.${serverId}" | sed -e "s/\\..*$//g"`,
  );
  const screenPid = stdout.replace('\n', '');

  await exec(
    `screen -S "${screenPid}.${serverId}" -p 0 -X stuff "${command}
"`, // note, this extra line break is needed
  );
};
