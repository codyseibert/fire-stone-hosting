import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import ConfigureServer from '../ConfigureServer';
import Logs from '../Logs';
import ServerHealth from '../ServerHealth';

import stopServer from '../../actions/stopServer.action';
import startServer from '../../actions/startServer.action';
import getServer from '../../actions/getServer.action';
import { SideNavigation } from './SideNavigation';

const DashboardPage = props => {
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
            <SideNavigation
              history={props.history}
              serverId={props.match.params.serverId}
            />
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
)(DashboardPage);
