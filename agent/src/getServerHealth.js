const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async ({ serverId }) => {
  const { stdout } = await exec(`docker stats --no-stream --format "{{.CPUPerc}}|{{.MemPerc}}" ${serverId}`);
  const [cpuPercent, memoryPercent] = stdout.replace('\n', '').split('|');
  return {
    cpuPercent,
    memoryPercent,
  };
};
