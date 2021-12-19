import path from 'path';
import fs from 'fs/promises';
import { ServerConfig, validateConfigKeys } from '../util/serverConfig';
import { getServerConfig } from './getServerConfig';

export const updateServerConfig = async (
  config: ServerConfig,
  serverId: string,
): Promise<boolean> => {
  try {
    // Validate configuration data
    await validateConfigKeys(config);

    // Format and update configuration file
    const filePath = path.join(
      process.env.SERVERS_DIR,
      `/${serverId}/server.properties`,
    );
    const oldConfigData = await getServerConfig(serverId);

    const newConfig = {
      ...oldConfigData,
      ...config,
    };

    const configData = Object.entries(newConfig)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    await fs.writeFile(filePath, configData);

    return true;
  } catch (err) {
    console.log(`Could not update configuration file for ${serverId}: ${err}`);

    return false;
  }
};
