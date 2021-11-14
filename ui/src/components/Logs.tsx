import io from 'socket.io-client';

import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import getServersForUser from '../actions/getServersForUser.action';
import gotoConfigureServer from '../actions/gotoConfigureServer.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import setLogs from '../actions/setLogs.action';

let socket;

const Logs = props => {
  const pane = useRef(null);
  const [command, setCommand] = useState('');

  useEffect(() => {
    socket = io('http://localhost:5000', {query: `serverId=${props.match.params.serverId}`});
    let allLogs = '';

    socket.on('connect', (event) => {
      console.log('connected', event);
    });

    socket.on('logs', logs => {
      props.setLogs(logs);
      allLogs = logs;
      pane.current.scrollTop = pane.current.scrollHeight;
    });

    socket.on('line', line => {
      allLogs += line;
      props.setLogs(allLogs);
      pane.current.scrollTop = pane.current.scrollHeight;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      socket.emit('command', command);
      setCommand('');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <span
            ref={pane}
            style={{
              height: '300px',
              overflowY: 'scroll',
              whiteSpace: 'pre-line',
              display: 'inline-block',
            }}
          >
            {props.logs}
          </span>
          <div className="form-group">
            <input
              className="form-control"
              onKeyDown={onKeyDown}
              onChange={e => {
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

const mapStateToProps = state => ({
  logs: state.logs,
  servers: state.servers,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getServersForUser: opts => dispatch(getServersForUser(opts)),
  setLogs: logs => dispatch(setLogs(logs)),
  gotoConfigureServer: opts => dispatch(gotoConfigureServer(opts)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logs);
