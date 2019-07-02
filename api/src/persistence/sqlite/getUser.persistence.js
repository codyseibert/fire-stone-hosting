module.exports = async ({ applicationContext, email }) => {
  const users = await (await applicationContext.db).all(
    'SELECT * from `users` WHERE `email` = ?',
    [email],
  );
  return users.length ? users[0] : null;
};
