
const request = require('request-promise-native');

module.exports = async ({ nodeId }) => request({
  method: 'get',
  json: true,
  url: `http://192.168.1.5:3333/nodes/${nodeId}/servers`,
});
