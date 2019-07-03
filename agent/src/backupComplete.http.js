
const request = require('request-promise-native');

module.exports = async ({ serverId }) => request({
  method: 'post',
  json: true,
  url: `http://192.168.1.5:3333/servers/${serverId}/backup-complete`,
});
