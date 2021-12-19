import util from 'util';
import cp from 'child_process';
import path from 'path';
import { backupCompleteProxy } from '../proxies/backupCompleteProxy';

const exec = util.promisify(cp.exec);

type runBackupOptions = {
  serverId: string;
};

interface runBackupInterface {
  (opts: runBackupOptions): Promise<any>;
}

export const runBackup: runBackupInterface = async ({ serverId }) => {
  const serverPath = path.join(process.env.SERVERS_DIR, `/${serverId}`);

  // disable minecraft auto save
  await exec(`screen -S "${serverId}" -p 0 -X stuff "/save-off\r"`);

  // save the world
  await exec(`screen -S "${serverId}" -p 0 -X stuff "/save-all\r"`);

  // create the tar
  await exec(`cd ${serverPath} && tar -zcvf ${serverId}.tar.gz .`);

  // TODO: upload  to s3 instead of copying to tmp
  await exec(`cp ${serverPath}/${serverId}.tar.gz ..`);

  // delete the tar
  await exec(`rm ${serverPath}/${serverId}.tar.gz`);

  // enable minecraft auto save
  await exec(`screen -S "${serverId}" -p 0 -X stuff "/save-on\r"`);

  // set runBackup back to false
  await backupCompleteProxy({
    serverId,
  });
};
