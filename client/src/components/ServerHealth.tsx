import React, { useEffect } from "react";
import { connect } from "react-redux";
import { State } from "..";
import { Server } from "../../../api/src/models/Server";
import getServerAction, {
  getServerActionInterface,
} from "../actions/getServerAction";

const ServerHealth = ({
  match,
  server,
  getServerAction,
}: {
  getServerAction: getServerActionInterface;
  match: {
    params: {
      serverId: string;
    };
  };
  server: Server;
}) => {
  useEffect(() => {
    getServerAction({
      serverId: match.params.serverId,
    });
    const interval = setInterval(() => {
      getServerAction({
        serverId: match.params.serverId,
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12"></div>
      </div>

      {server && (
        <div className="row">
          <div className="col-md-12">
            <h2>Server Health</h2>

            {/* <div className="progress">
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{ width: server.cpuPercent }}
                aria-valuenow={parseInt(
                  (server.cpuPercent || "0").replace("%", "")
                )}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                CPU: {server.cpuPercent}
              </div>
            </div>
            <br />

            <div className="progress">
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{ width: server.memoryPercent }}
                aria-valuenow={parseInt(
                  (server.cpuPercent || "0").replace("%", "")
                )}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                MEM: {server.memoryPercent}{" "}
                {((parseInt((server.memoryPercent || "").replace("%", "")) /
                  100) *
                  server.memory) /
                  1024 /
                  1024 /
                  1024}{" "}
                / {server.memory / 1024 / 1024 / 1024} GB
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({ server: state.server });

const mapDispatchToProps = {
  getServerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerHealth);
