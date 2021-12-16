import util from 'util';
import cp from 'child_process';

const exec = util.promisify(cp.exec);

interface getRunningContainersInterface {
  (): Promise<string[]>;
}

export const getRunningContainers: getRunningContainersInterface = async () => {
  const { stdout: namesStdout } = await exec("docker ps --format '{{.Names}}'");
  const names = namesStdout
    .trim()
    .split('\n')
    .filter(n => n.length)
    .filter(n => n.startsWith('mc-'));

  return names;
};
