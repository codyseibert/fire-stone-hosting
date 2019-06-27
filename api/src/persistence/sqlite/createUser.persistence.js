module.exports = async ({ applicationContext, user }) => {
  const { accountId, email, password } = user;
  const statement = await (await applicationContext.db).prepare(
    'INSERT INTO `users` (`id`, `email`, `password`) VALUES (?, ?, ?)',
  );
  await statement.run(accountId, email, password);
  await statement.finalize();
};
