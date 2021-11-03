
const request = require('request-promise-native');

module.exports = async ({ nodeId }) => request({
  method: 'get',
  json: true,
  url: `http://localhost:3333/nodes/${nodeId}/servers`,
});
