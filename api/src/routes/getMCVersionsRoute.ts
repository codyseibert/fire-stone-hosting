import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

export const getMCVersionsRoute = (req: Request, res: Response) => {
  fs.readFile(
    path.join(__dirname, '../data/versions.json'),
    'utf8',
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(JSON.parse(data));
      }
    },
  );
};
