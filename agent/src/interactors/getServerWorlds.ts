import util from 'util';
import cp from 'child_process';

const exec = util.promisify(cp.exec);

interface IGetServerWorlds {
  (serverId: string): Promise<any>;
}

export const getServerWorlds: IGetServerWorlds = async serverId => {
  const { stdout } = await exec(
    `cd ${process.env.SERVERS_DIR}/${serverId} && find . -type f -name 'level.dat' | sed -r 's|/[^/]+$||' |sort |uniq`,
  );
  const worlds = stdout
    .split('\n')
    .filter(Boolean)
    .map(world => world.replace('./', ''));
  return worlds;
};
