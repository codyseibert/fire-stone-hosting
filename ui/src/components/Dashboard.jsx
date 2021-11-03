import React, { useEffect } from 'react';
import { Route, Switch, Link } from 'react-router';
import { connect } from 'react-redux';
import ConfigureServer from './ConfigureServer';
import Logs from './Logs';
import ServerHealth from './ServerHealth';

import stopServer from '../actions/stopServer.action';
import startServer from '../actions/startServer.action';
import getServer from '../actions/getServer.action';

const Dashboard = props => {
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

  console.log('props', props);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 bg-info">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>Fun Server</h1>

                  {props.server.running ? (
                    <span className="badge badge-success">Online</span>
                  ) : (
                    <span className="badge badge-secondary">Offline</span>
                  )}
                </div>
                <div className="col-md-6">
                  {props.server.running && (
                    <div>
                      <button
                        onClick={() =>
                          props.stopServer({
                            serverId: props.match.params.serverId,
                          })
                        }
                        type="button"
                        className="btn btn-outline-danger mr-2"
                      >
                        Stop
                      </button>
                    </div>
                  )}
                  {!props.server.running && (
                    <button
                      onClick={() =>
                        props.startServer({
                          serverId: props.match.params.serverId,
                        })
                      }
                      type="button"
                      className="btn btn-outline-success"
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <a
              onClick={e => {
                e.preventDefault();
                props.history.push(
                  `/dashboard/${props.match.params.serverId}/configure`,
                );
              }}
              href=""
            >
              Configure
            </a>
            <br />
            <a
              onClick={e => {
                e.preventDefault();
                props.history.push(
                  `/dashboard/${props.match.params.serverId}/health`,
                );
              }}
              href=""
            >
              Health
            </a>
            <br />
            <a
              onClick={e => {
                e.preventDefault();
                props.history.push(
                  `/dashboard/${props.match.params.serverId}/logs`,
                );
              }}
              href=""
            >
              Logs
            </a>
            <br />
            <a
              onClick={e => {
                e.preventDefault();
                props.history.push(
                  `/dashboard/${props.match.params.serverId}/backups`,
                );
              }}
              href=""
            >
              Backups
            </a>
            <br />
            <a
              onClick={e => {
                e.preventDefault();
                props.history.push(
                  `/dashboard/${props.match.params.serverId}/backups`,
                );
              }}
              href=""
            >
              FTP
            </a>
            <br />
            <a
              onClick={e => {
                e.preventDefault();
                props.history.push(
                  `/dashboard/${props.match.params.serverId}/backups`,
                );
              }}
              href=""
            >
              Worlds
            </a>
            <br />
            <a
              onClick={e => {
                e.preventDefault();
                props.history.push(
                  `/dashboard/${props.match.params.serverId}/backups`,
                );
              }}
              href=""
            >
              Files
            </a>
            <br />
            <a
              onClick={e => {
                e.preventDefault();
                props.history.push(
                  `/dashboard/${props.match.params.serverId}/backups`,
                );
              }}
              href=""
            >
              Players
            </a>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route
                exact
                path="/dashboard/:serverId/configure"
                render={props => (
                  <ConfigureServer
                    match={props.match}
                    serverId={props.match.params.serverId}
                  />
                )}
              />
              <Route exact path="/dashboard/:serverId/logs" component={Logs} />
              <Route
                exact
                path="/dashboard/:serverId/health"
                component={ServerHealth}
              />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({ server: state.server });

const mapDispatchToProps = dispatch => ({
  stopServer: opts => dispatch(stopServer(opts)),
  startServer: opts => dispatch(startServer(opts)),
  getServer: opts => dispatch(getServer(opts)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
