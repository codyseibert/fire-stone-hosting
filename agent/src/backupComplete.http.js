
const request = require('request-promise-native');

module.exports = async ({ serverId }) => request({
  method: 'post',
  json: true,
  url: `http://localhost:3333/servers/${serverId}/backup-complete`,
});
