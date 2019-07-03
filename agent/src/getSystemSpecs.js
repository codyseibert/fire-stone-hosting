const publicIp = require('public-ip');
const os = require('os');

module.exports = async () => {
  const ip = await publicIp.v4();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  return {
    nodeId: process.env.NODE_ID || 'abc123',
    ip,
    totalMemory,
    freeMemory,
  };
};
