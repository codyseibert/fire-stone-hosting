
const request = require('request-promise-native');

module.exports = async ({ serverId, cpuPercent, memoryPercent }) => request({
  method: 'post',
  json: true,
  url: `http://localhost:3333/servers/${serverId}/health`,
  body: {
    cpuPercent,
    memoryPercent,
  },
});
