module.exports = async ({ userId, applicationContext }) =>
  applicationContext.persistence.getServersForUser({
    userId,
    applicationContext,
  });
