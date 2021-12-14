export type Server = {
  id: string;
  nodeId: string;
  port: number;
  version: string;
  userId: string;
  memory: number;
  running: boolean;
  runBackup: boolean;
  restart: boolean;
};
