import util from 'util';
import cp from 'child_process';

const exec = util.promisify(cp.exec);

type getRunningContainersOptions = {
  serverId: string,
}

interface getRunningContainersInterface {
  (opts: getRunningContainersOptions): Promise<any>
}

export const getRunningContainers: getRunningContainersInterface = async () => {
  const { stdout: namesStdout } = await exec("docker ps --format '{{.Names}}'");
  const names = namesStdout.trim().split('\n').filter(n => n.length);
  return names;
};
