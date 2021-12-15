import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ServerContext } from "./context/ServerContext";

import { NodeContext } from "./context/NodeContext";

const Logs = () => {
  const pane = useRef<HTMLDivElement>(null);
  const [command, setCommand] = useState("");
  const params = useParams();
  const serverId = params.serverId!;
  const [logs, setLogs] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const { server } = useContext(ServerContext)!;
  const { node } = useContext(NodeContext)!;

  useEffect(() => {
    if (!node || !server || socket) return;
    // this agent url / port shouldn't be hard coded and instead configured based on the
    // where the agent is
    console.log("starting socket");
    const sock = io(`ws://${node.ip}:5000`, {
      query: {
        serverId,
      },
    });
    // let allLogs = "";

    sock.on("connect", () => {
      console.log("connected to agent");
    });

    sock.on("logs", (logs) => {
      setLogs(logs);
      // allLogs = logs;
      if (pane.current) {
        pane.current.scrollTop = pane.current.scrollHeight;
      }
    });

    sock.on("line", (line) => {
      setLogs((l) => l + line);
      if (pane.current) {
        pane.current.scrollTop = pane.current.scrollHeight;
      }
    });

    setSocket(sock);
  }, [server, node, socket, serverId]);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };

    // eslint-disable-next-line
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      socket?.emit("command", command);
      setCommand("");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h4>Terminal</h4>
        </div>
      </div>

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
    </>
  );
};

export default Logs;
