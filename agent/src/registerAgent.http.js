const request = require('request-promise-native');

module.exports = async ({
  nodeId,
  ip,
  totalMemory,
  freeMemory,
}) => {
  await request({
    method: 'post',
    body: {
      nodeId,
      ip,
      totalMemory,
      freeMemory,
    },
    json: true,
    url: 'http://192.168.1.5:3333/nodes',
  });
};
