import React, { useContext, useEffect } from 'react';
import { getServerApi } from '../../api/getServerApi';
import { deleteServerApi } from '../../api/deleteServerApi';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { useParams } from 'react-router-dom';

import { stopServerApi } from '../../api/stopServerApi';
import { startServerApi } from '../../api/startServerApi';
import { ServerContext } from './context/ServerContext';
import { restartServerApi } from '../../api/restartServerApi';
import { NodeContext } from './context/NodeContext';

export const Overview = () => {
  const params = useParams();
  const serverId = params.serverId!;
  const { server, setServer } = useContext(ServerContext)!;
  const { node } = useContext(NodeContext)!;
  const authentication = useContext(AuthenticationContext)
    ?.authentication!;
  const navigate = useNavigate();

  const deleteServer = async () => {
    const yes = window.confirm(
      'Are you sure you would like to delete this server? This action is not recoverable, and all data will be lost.'
    );
    if (yes) {
      await deleteServerApi(serverId, authentication.token);
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    if (!authentication.token) {
      navigate('/');
    }

    getServerApi({
      serverId,
    }).then((serverFromApi) => setServer(serverFromApi));
  }, [authentication.token, navigate, setServer, serverId]);

  if (!server) return null;
  if (!node) return null;

  const stopServer = async () => {
    await stopServerApi({ serverId }, authentication.token);
    setServer({
      ...server,
      running: false,
    });
  };

  const restartServer = async () => {
    await restartServerApi(
      { serverId },
      authentication.token
    );
    setServer({
      ...server,
      restart: true,
    });
  };

  const startServer = async () => {
    await startServerApi(
      { serverId },
      authentication.token
    );
    setServer({
      ...server,
      running: true,
    });
  };

  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <h4>Overview</h4>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="form-group">
            <label className="mb-2">Address</label>
            <input
              className="form-control"
              disabled
              value={`${node.ip}:${server.port}`}
            />
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <h5>Restart</h5>
          <p>
            You may want to restart the server if it is
            getting laggy or you manually made changes to
            server files.
          </p>
        </div>
        <div className="col-md-4">
          <button
            onClick={restartServer}
            type="button"
            disabled={server.restart}
            className="btn btn-outline-danger mr-2"
          >
            Restart
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <h5>Power</h5>
          <p>
            Shut down your server to prevent more players
            from joining.
          </p>
        </div>
        <div className="col-md-4">
          {!!server.running && (
            <button
              onClick={stopServer}
              type="button"
              className="btn btn-outline-danger mr-2"
            >
              Stop
            </button>
          )}
          {!server.running && (
            <button
              onClick={startServer}
              type="button"
              className="btn btn-outline-success"
            >
              Start
            </button>
          )}
        </div>
      </div>

      {/* <div className="row">
        <div className="col-md-8">
          <h5>Subscription</h5>
          <p>
            If you no longer want to pay to rent your
            server, you can continue by clicking the end
            subscription button. Don't worry, you'll still
            be able to use your server until the end of your
            subscription period. All your server data will
            be removed at the end of your subsription
            period. If you'd like to keep them, be sure to download your server files
            from our web interface if you plan to use the world in the future.
          </p>
        </div>
        <div className="col-md-4">
          <button
            onClick={() => deleteServer()}
            type="button"
            className="btn btn-outline-danger"
          >
            End Subscription
          </button>
        </div>
      </div> */}
    </>
  );
};
