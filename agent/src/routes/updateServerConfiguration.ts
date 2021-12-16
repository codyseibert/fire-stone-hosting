import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const updateServerConfiguration = (req: Request, res: Response) => {
  const { serverId } = req.params;
  const filePath = path.join(
    process.env.SERVERS_DIR,
    `${serverId}/server.properties`,
  );

  console.log(req.body);

  fs.writeFile(filePath, req.body, err => {
    res.send('success');
  });
};
