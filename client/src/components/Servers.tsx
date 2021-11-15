import React, { useEffect } from "react";
import { connect } from "react-redux";
import getServersForUser from "../actions/getServersForUser.action";
import gotoConfigureServer from "../actions/gotoConfigureServer.action";
import stopServer from "../actions/stopServer.action";
import startServer from "../actions/startServer.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { State } from "..";
import { History } from "history";

import { Server } from "../../../api/src/models/Server";

const Servers = ({
  user,
  getServersForUser,
  history,
  servers,
}: {
  getServersForUser: Function;
  history: History;
  servers: Server[];
  user: {
    id: string;
  };
}) => {
  useEffect(() => {
    getServersForUser({
      userId: user.id,
    });

    // setInterval(() => {
    //   props.getServersForUser({
    //     userId: props.user.id,
    //   });
    // }, 5000);
  }, []);

  const renderServerRow = (server: Server) => (
    <tr key={server.id}>
      <td>Fun Server</td>
      <td>:{server.port}</td>
      <td>funserver.firestonehosting.com</td>
      <td>
        {server.running ? (
          <span className="badge badge-success">Online</span>
        ) : (
          <span className="badge badge-secondary">Offline</span>
        )}
      </td>
      <td>12</td>
      <td>
        <button
          onClick={() => history.push(`dashboard/${server.id}/configure`)}
          type="button"
          className="btn btn-outline-primary mr-2"
        >
          View
        </button>
      </td>
    </tr>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Your Servers</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Hostname</th>
                <th scope="col">Server Address</th>
                <th scope="col">Status</th>
                <th scope="col">Players</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{servers.map(renderServerRow)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  servers: state.servers,
  user: state.user,
});

const mapDispatchToProps = {
  stopServer,
  startServer,
  getServersForUser,
  gotoConfigureServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Servers);
