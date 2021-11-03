const sqlite = require('sqlite');

module.exports = sqlite.open('./database.sqlite').then(dbObj => {
  const db = dbObj;
  // db.run('DROP TABLE IF EXISTS `users`');
  // db.run('DROP TABLE IF EXISTS `nodes`');
  // db.run('DROP TABLE IF EXISTS `servers`');
  db.run(
    'CREATE TABLE IF NOT EXISTS `users` (id VARCHAR(255) PRIMARY KEY, email VARCHAR(255), password VARCHAR(255), UNIQUE(email))',
  );
  db.run(
    'CREATE TABLE IF NOT EXISTS `nodes` (`id` VARCHAR(255) PRIMARY KEY, `ip` VARCHAR(255), `total_memory` INT, `free_memory` INT)',
  );
  db.run(
    'CREATE TABLE IF NOT EXISTS `servers` (`id` VARCHAR(255) PRIMARY KEY, `nodeId` INT NOT NULL, `port` INIT, `memory` INT, `cpuPercent` VARCHAR(255), `memoryPercent` VARCHAR(255), `running` BOOL, `runBackup` BOOL, `userId` INT)',
  );
  return db;
});
