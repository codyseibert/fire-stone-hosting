import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { MCVersion } from '../src/models/MCVersion';

const main = async () => {
  const response = await fetch(
    'https://launchermeta.mojang.com/mc/game/version_manifest.json',
  );
  const { versions }: { versions: MCVersion[] } = await response.json();
  const releases = versions.filter(version => version.type === 'release');
  fs.writeFileSync(
    path.join(__dirname, '../src/data/versions.json'),
    JSON.stringify(releases, null, 2),
  );
};

main();
