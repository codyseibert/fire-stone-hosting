module.exports = async ({ nodeId, applicationContext }) =>
  applicationContext.persistence.getServersOnNode({
    nodeId,
    applicationContext,
  });
