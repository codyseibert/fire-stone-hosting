import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getServer from '../actions/getServer.action';

const ServerHealth = props => {
  useEffect(() => {
    props.getServer({
      serverId: props.match.params.serverId,
    });
    const interval = setInterval(() => {
      props.getServer({
        serverId: props.match.params.serverId,
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

      {props.server && (
        <div className="row">
          <div className="col-md-12">
            <h2>Server Health</h2>

            <div className="progress">
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{ width: props.server.cpuPercent }}
                aria-valuenow={(props.server.cpuPercent || '').replace('%', '')}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                CPU: {props.server.cpuPercent}
              </div>
            </div>
            <br />

            <div className="progress">
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{ width: props.server.memoryPercent }}
                aria-valuenow={(props.server.memoryPercent || '').replace(
                  '%',
                  '',
                )}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                MEM: {props.server.memoryPercent}{' '}
                {((parseInt(
                  (props.server.memoryPercent || '').replace('%', ''),
                ) /
                  100) *
                  props.server.memory) /
                  1024 /
                  1024 /
                  1024}{' '}
                / {props.server.memory / 1024 / 1024 / 1024} GB
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({ server: state.server });

const mapDispatchToProps = dispatch => ({
  getServer: obj => {
    dispatch(getServer(obj));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServerHealth);
