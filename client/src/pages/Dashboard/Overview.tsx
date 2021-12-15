import React, { useContext, useEffect } from "react";
import getServer from "../../http/getServer.http";
import deleteServerHttp from "../../http/deleteServer.http";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { useParams } from "react-router-dom";

import stopServerHttp from "../../http/stopServer.http";
import startServerHttp from "../../http/startServer.http";
import { ServerContext } from "./context/ServerContext";
import restartServerHttp from "../../http/restartServer.http";

export const Overview = () => {
  const params = useParams();
  const serverId = params.serverId!;
  const { server, setServer } = useContext(ServerContext)!;
  const authentication = useContext(AuthenticationContext)?.authentication!;
  const navigate = useNavigate();

  const deleteServer = async () => {
    const yes = window.confirm(
      "are you sure you want to delete this server?  all data will be lost"
    );
    if (yes) {
      await deleteServerHttp(serverId, authentication.token);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (!authentication.token) {
      navigate("/");
    }

    getServer({
      serverId,
    }).then((serverFromApi) => setServer(serverFromApi));
  }, [authentication.token, navigate, setServer, serverId]);

  if (!server) return null;

  const stopServer = async () => {
    await stopServerHttp({ serverId }, authentication.token);
    setServer({
      ...server,
      running: false,
    });
  };

  const restartServer = async () => {
    await restartServerHttp({ serverId }, authentication.token);
    setServer({
      ...server,
      restart: true,
    });
  };

  const startServer = async () => {
    await startServerHttp({ serverId }, authentication.token);
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
        <div className="col-md-8">
          <h5>Restart</h5>
          <p>
            Did you manually update server files? You may need to manually
            restart it for your changes to take effect.
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
            You'll may want to stop your server if you don't want people to
            connect to it.
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

      <div className="row">
        <div className="col-md-8">
          <h5>Subscription</h5>
          <p>
            If you no longer want to pay to rent your server, you can continue
            by clicking the end subscription button. Don't worry, you'll still
            be able to use your server until the end of your subscription
            period. All your server data will be removed at the end of your
            subsription period, so be sure to download your server files from
            our service if you plan to use the world at a later point.
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
      </div>
    </>
  );
};
