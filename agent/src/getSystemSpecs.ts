import publicIp from 'public-ip';
import os from 'os';

interface getSystemSpecsInterface {
  (): Promise<any>
}

export const getSystemSpecs: getSystemSpecsInterface = async () => {
  const ip = await publicIp.v4();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  return {
    nodeId: process.env.NODE_ID,
    ip,
    totalMemory,
    freeMemory,
  };
};
