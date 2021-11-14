import util from 'util';
import cp from 'child_process';
const exec = util.promisify(cp.exec);

type stopServerOptions = {
  serverId: string,
}

interface stopServerInterface {
  (opts: stopServerOptions): Promise<any>
}

export const stopServer: stopServerInterface = async ({ serverId }) => {
  try {
    await exec(`screen -S "${serverId}" -p 0 -X stuff "stop\r"`);
  } catch (err) {
    console.log(err);
  }
};
