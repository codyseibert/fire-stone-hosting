export type Server = {
  id: string;
  ip: string;
  nodeId: string;
  port: number;
  memory: number;
  userId: string;
  running: boolean;
  runBackup: boolean;
  memoryPercent: string;
  cpuPercent: string;
};
