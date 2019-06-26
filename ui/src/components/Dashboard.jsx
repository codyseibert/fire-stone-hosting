import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getServersForUser from '../actions/getServersForUser.action';
import gotoConfigureServer from '../actions/gotoConfigureServer.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = props => {
  useEffect(() => {
    props.getServersForUser({
      userId: 'abc',
    });
  }, []);

  return (
    <div className="container">
      {props.servers.map(server => (
        <div key={server.id} className="row">
          <div className="col-md-12">
            <h1>My Servers</h1>
          </div>
          <div className="col-md-12">
            <h3>
              {server.ip}:{server.port}
            </h3>
          </div>
          <div className="col-md-12">
            {server.running ? (
              <span className="badge badge-success">Online</span>
            ) : (
              <span className="badge badge-secondary">Offline</span>
            )}
          </div>
          <div className="col-md-12">
            <span className="badge badge-secondary">{server.memory} GB</span>
            <a href="#"> change</a>
          </div>
          <div className="col-md-12 mt-2">
            <button
              onClick={() => props.gotoConfigureServer({ serverId: server.id })}
              type="button"
              className="btn btn-outline-secondary mr-2"
            >
              <FontAwesomeIcon className="mr-2" size="lg" icon="cogs" />
              Configure
            </button>
            {server.running && (
              <>
                <button type="button" className="btn btn-outline-danger mr-2">
                  Stop
                </button>

                <button type="button" className="btn btn-outline-warning">
                  Restart
                </button>
              </>
            )}
            {!server.running && (
              <button type="button" className="btn btn-outline-success">
                Start
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({ servers: state.servers });

const mapDispatchToProps = dispatch => ({
  getServersForUser: opts => dispatch(getServersForUser(opts)),
  gotoConfigureServer: opts => dispatch(gotoConfigureServer(opts)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
