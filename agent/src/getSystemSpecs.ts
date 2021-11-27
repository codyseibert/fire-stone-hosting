import publicIp from 'public-ip';
import os from 'os';

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
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  return {
    nodeId: process.env.NODE_ID,
    ip,
    totalMemory: Math.ceil(totalMemory / 1024 / 1024),
    freeMemory: Math.ceil(freeMemory / 1024 / 1024),
  };
};
