import { severConfigObject } from 'config/validation/serverConfig';

export type KeyValue = string | number | boolean;
export type ServerConfig = Record<string, KeyValue>;

// Add or remove values fro this list in order to dont be allowed to be modified
const blacklist = ['server-port', 'server-ip'];

// Get each key of type 'string' and returns it's respective value of type 'ServerConfig'
export const parseConfigKeyValue = (key: string): KeyValue => {
  // Handle booleans keys
  if (key === 'true') return true;
  if (key === 'false') return false;

  // Handle integer numbers
  const parseNumberKey = parseInt(key, 10);

  if (!Number.isNaN(parseNumberKey)) return parseNumberKey;

  // Defaults to string key
  return key;
};

export const isBlacklisted = (key: string) => blacklist.includes(key);

export const validateConfigKeys = async (config: ServerConfig) => {
  const keys = Object.keys(config);

  keys.forEach(key => {
    if (isBlacklisted(key)) {
      throw new Error(`Invalid blacklisted key mutation ${key}`);
    }
  });

  await severConfigObject.validate(config);
};
