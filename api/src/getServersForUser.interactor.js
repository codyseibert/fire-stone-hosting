module.exports = async ({ userId, persistence }) => persistence.getServersForUser({
  userId,
});
