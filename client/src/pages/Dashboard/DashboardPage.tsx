import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import stopServer from "../../actions/stopServer.action";
import startServer from "../../actions/startServer.action";
import { SideNavigation } from "./SideNavigation";
import getServer from "../../http/getServer.http";
import { useParams } from "react-router-dom";
import { Server } from "../../../../api/src/models/Server";
import ConfigureServer from "../../components/ConfigureServer";
import axios from "axios";
import deleteServerHttp from "../../http/deleteServer.http";
import { useAppSelector } from "../../hooks";

const DashboardPage = () => {
  const params = useParams();
  const serverId = params.serverId!;
  const [server, setServer] = useState<Server>();
  const token = useAppSelector((state) => state.authenticationReducer.token)!;
  const navigate = useNavigate();

  const deleteServer = async () => {
    const yes = window.confirm(
      "are you sure you want to delete this server?  all data will be lost"
    );
    if (yes) {
      await deleteServerHttp(serverId, token);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const serverFromApi = await getServer({
        serverId,
      });
      setServer(serverFromApi);
    };

    initialize();

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  if (!server) return null;

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 bg-info">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>Fun Server</h1>

                  {server.running ? (
                    <span className="badge badge-success">Online</span>
                  ) : (
                    <span className="badge badge-secondary">Offline</span>
                  )}
                </div>
                <div className="col-md-6">
                  {server.running && (
                    <div>
                      <button
                        onClick={() =>
                          stopServer({
                            serverId,
                          })
                        }
                        type="button"
                        className="btn btn-outline-danger mr-2"
                      >
                        Stop
                      </button>
                    </div>
                  )}
                  {!server.running && (
                    <button
                      onClick={() =>
                        startServer({
                          serverId,
                        })
                      }
                      type="button"
                      className="btn btn-outline-success"
                    >
                      Start
                    </button>
                  )}
                  {
                    <button
                      onClick={() => deleteServer()}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <SideNavigation serverId={serverId} />
          </div>

          <div className="col-md-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
