/* eslint-disable no-restricted-syntax */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const getRunningContainers = require('./getRunningContainers');

module.exports = async ({ expectedServerIds }) => {
  const runningServerIds = await getRunningContainers();

  for (const runningId of runningServerIds) {
    if (!expectedServerIds.find(expectedId => expectedId === runningId)) {
      // eslint-disable-next-line no-await-in-loop
      exec(`docker stop ${runningId}`);
    }
  }
};
