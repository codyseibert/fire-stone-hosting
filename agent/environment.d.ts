declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MASTER_NODE_BASE_URL: string;
      NODE_ID: string;
      SERVERS_DIR: string;
      PORT: string;
    }
  }
}

export {};
