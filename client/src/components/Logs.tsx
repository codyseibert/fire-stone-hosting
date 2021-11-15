import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import getServersForUser from "../actions/getServersForUser.action";
import gotoConfigureServer from "../actions/gotoConfigureServer.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import setLogs from "../actions/setLogs.action";
import { State } from "..";
import { Server } from "../../../api/src/models/Server";

let socket: Socket;

const Logs = ({
  match,
  setLogs,
  servers,
  logs,
}: {
  match: {
    params: {
      serverId: string;
    };
  };
  servers: Server[];
  setLogs: Function;
  logs: string[];
}) => {
  const pane = useRef<HTMLDivElement>(null);
  const [command, setCommand] = useState("");

  useEffect(() => {
    socket = io("http://localhost:5000", {
      query: {
        serverId: match.params.serverId,
      },
    });
    let allLogs = "";

    socket.on("connect", () => {
      // console.log("connected", event);
    });

    socket.on("logs", (logs) => {
      setLogs(logs);
      allLogs = logs;
      if (pane.current) {
        pane.current.scrollTop = pane.current.scrollHeight;
      }
    });

    socket.on("line", (line) => {
      allLogs += line;
      setLogs(allLogs);
      if (pane.current) {
        pane.current.scrollTop = pane.current.scrollHeight;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      socket.emit("command", command);
      setCommand("");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <span
            ref={pane}
            style={{
              height: "300px",
              overflowY: "scroll",
              whiteSpace: "pre-line",
              display: "inline-block",
            }}
          >
            {logs}
          </span>
          <div className="form-group">
            <input
              className="form-control"
              onKeyDown={onKeyDown}
              onChange={(e) => {
                setCommand(e.currentTarget.value);
              }}
              value={command}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  logs: state.logs,
  servers: state.servers,
  user: state.user,
});

const mapDispatchToProps = {
  getServersForUser,
  setLogs,
  gotoConfigureServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
