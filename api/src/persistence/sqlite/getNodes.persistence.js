module.exports = async ({ applicationContext }) =>
  (await applicationContext.db).all('SELECT * from `nodes`');
