import util from 'util';
import cp from 'child_process';

const exec = util.promisify(cp.exec);

type getServerHealthOptions = {
  serverId: string;
};

interface getServerHealthInterface {
  (opts: getServerHealthOptions): Promise<any>;
}

export const getServerHealth: getServerHealthInterface = async ({
  serverId,
}) => {
  const { stdout } = await exec(
    `docker stats --no-stream --format "{{.CPUPerc}}|{{.MemPerc}}" mc-${serverId}`,
  );

  const [cpuPercent, memoryPercent] = stdout.replace('\n', '').split('|');

  return {
    cpuPercent,
    memoryPercent,
  };
};
