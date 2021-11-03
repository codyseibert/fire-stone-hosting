const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async ({ serverId }) => {
  try {
    await exec(`screen -S "${serverId}" -p 0 -X stuff "stop\r"`);
  } catch (err) {
    console.log(err);
  }
};
