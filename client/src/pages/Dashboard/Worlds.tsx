import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { NodeContext } from './context/NodeContext';
import { ServerContext } from './context/ServerContext';
import styled from 'styled-components';
import { getServerWorldsApi } from '../../api/getServerWorldsApi';
import worldJpg from '../../images/world.jpg';
import { switchWorldApi } from '../../api/switchWorldApi';
import { getServerConfigurationApi } from '../../api/getServerConfigurationApi';

const WorldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
`;

interface IWorldCard {
  isSelected: boolean;
}

const WorldCard = styled.div<IWorldCard>`
  border: ${(props: any) =>
    props.isSelected ? '1px solid #0d6efd;' : '0'};
`;

export const Worlds = () => {
  const { server } = useContext(ServerContext)!;
  const { node } = useContext(NodeContext)!;
  const [worlds, setWorlds] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedWorld, setSelectedWorld] = useState('');

  useEffect(() => {
    if (!server || !node) return;

    getServerWorldsApi({
      nodeIp: node.ip,
      serverId: server.id,
    }).then((worlds) => {
      setWorlds(worlds);
    });

    getServerConfigurationApi({
      nodeIp: node.ip,
      serverId: server.id,
    }).then((configuration) => {
      setSelectedWorld(configuration['level-name']);
    });
  }, [server, node]);

  if (!server) return null;
  if (!node) return null;

  const switchToWorld = (world: string) => {
    setSelectedWorld(world);
    setShowSuccess(true);
    window.scrollTo(0, 0);

    switchWorldApi({
      nodeIp: node.ip,
      serverId: server.id,
      world,
    });
  };

  return (
    <div>
      {showSuccess && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Your server is now restarting to your selected
          world.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowSuccess(false)}
          ></button>
        </div>
      )}

      <h3>Worlds</h3>
      <p>Switch to any of your existing worlds below:</p>

      <div className="alert alert-warning" role="alert">
        Heads up, switching worlds will save and restart
        your server for you.
      </div>

      <WorldsGrid>
        {worlds.map((world) => (
          <WorldCard
            isSelected={selectedWorld === world}
            className="card"
            key={world}
          >
            <img
              src={worldJpg}
              className="card-img-top"
              alt="the world you will be playing on"
            />
            <div className="card-body">
              <h5 className="card-title">{world}</h5>
              <p className="card-text">
                Some description...
              </p>
              {selectedWorld !== world && (
                <button
                  onClick={() => switchToWorld(world)}
                  type="button"
                  className="btn btn-outline-primary me-2"
                >
                  Switch to World
                </button>
              )}
            </div>
          </WorldCard>
        ))}
      </WorldsGrid>
    </div>
  );
};
