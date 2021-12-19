import path from 'path';
import fs from 'fs/promises';
import {
  isBlacklisted,
  parseConfigKeyValue,
  ServerConfig,
} from '../util/serverConfig';

export const getServerConfig = async (serverId: string) => {
  const config: ServerConfig = {};

  try {
    // Get configuration file
    const filePath = path.join(
      process.env.SERVERS_DIR,
      `/${serverId}/server.properties`,
    );

    const data = await fs.readFile(filePath);

    // Transform into object
    const configData = data.toString().replace(/\#.*\n/g, '');

    const keys = configData.split('\n').map(entry => entry.split('='));

    // Filter and parse values
    keys.forEach(([key, val]: [string, string]) => {
      if (!key || val === undefined || isBlacklisted(key)) return;

      config[key] = parseConfigKeyValue(val);
    });
  } catch (err) {
    console.log(`Could not read configuration file for ${serverId}: ${err}`);
  } finally {
    return config;
  }
};
