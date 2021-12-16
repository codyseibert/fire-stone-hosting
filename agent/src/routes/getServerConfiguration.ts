import { Request, Response } from 'express';
import path from 'path';

export const getServerConfiguration = (req: Request, res: Response) => {
  const { serverId } = req.params;

  const filePath = path.join(
    process.env.SERVERS_DIR,
    `${serverId}/server.properties`,
  );

  res.sendFile(filePath);
};
