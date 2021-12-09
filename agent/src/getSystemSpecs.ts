import publicIp from 'public-ip';

import os from 'os';

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null);

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

console.log(results);

export type Specs = {
  nodeId: string;
  ip: string;
  totalMemory: number;
  freeMemory: number;
};
interface getSystemSpecsInterface {
  (): Promise<Specs>;
}

export const getSystemSpecs: getSystemSpecsInterface = async () => {
  const ip = await publicIp.v4();
  const privateIp = results.en0[0];
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  return {
    nodeId: process.env.NODE_ID,
    ip: process.env.NODE_ENV === 'production' ? ip : privateIp,
    totalMemory: Math.ceil(totalMemory / 1024 / 1024),
    freeMemory: Math.ceil(freeMemory / 1024 / 1024),
  };
};
