const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async () => {
  const { stdout: namesStdout } = await exec("docker ps --format '{{.Names}}'");
  const names = namesStdout.trim().split('\n').filter(n => n.length);
  return names;
};
