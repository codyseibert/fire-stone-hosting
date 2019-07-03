const util = require('util');
const exec = util.promisify(require('child_process').exec);
const backupComplete = require('./backupComplete.http');

module.exports = async ({ serverId }) => {
// disable minecraft auto save
  await exec(`screen -S "${serverId}" -p 0 -X stuff "/save-off\r"`);

  // save the world
  await exec(`screen -S "${serverId}" -p 0 -X stuff "/save-all\r"`);

  // create the tar
  await exec(`cd ../servers/${serverId} && tar -zcvf ${serverId}.tar.gz .`);

  // TODO: upload  to s3 instead of copying to tmp
  await exec(`cp ../servers/${serverId}/${serverId}.tar.gz ..`);

  // delete the tar
  await exec(`rm ../servers/${serverId}/${serverId}.tar.gz`);

  // enable minecraft auto save
  await exec(`screen -S "${serverId}" -p 0 -X stuff "/save-on\r"`);

  // set runBackup back to false
  await backupComplete({
    serverId,
  });
};
