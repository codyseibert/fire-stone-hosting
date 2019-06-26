module.exports = async ({ applicationContext }) =>
  applicationContext.persistence.getNodes({
    applicationContext,
  });
