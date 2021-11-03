module.exports = async ({
  applicationContext,
  serverId,
  memoryPercent,
  cpuPercent,
}) =>
  applicationContext.persistence.setServerHealth({
    applicationContext,
    serverId,
    memoryPercent,
    cpuPercent,
  });
