declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      JWT_SECRET: string;
    }
  }
}

export {};
