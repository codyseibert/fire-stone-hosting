module.exports = async ({ applicationContext, node }) =>
  applicationContext.persistence.createNode({
    applicationContext,
    node,
  });
