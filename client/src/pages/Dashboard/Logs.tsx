import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

let socket: Socket;

const Logs = () => {
  const pane = useRef<HTMLDivElement>(null);
  const [command, setCommand] = useState('');
  const params = useParams();
  const serverId = params.serverId!;
  const [logs, setLogs] = useState('');

  useEffect(() => {
    // this agent url / port shouldn't be hard coded and instead configured based on the
    // where the agent is
    socket = io('ws://localhost:5000', {
      query: {
        serverId,
      },
    });
    // let allLogs = "";

    socket.on('connect', () => {
      console.log('connected to agent');
    });

    socket.on('logs', (logs) => {
      setLogs(logs);
      // allLogs = logs;
      if (pane.current) {
        pane.current.scrollTop = pane.current.scrollHeight;
      }
    });

    socket.on('line', (line) => {
      setLogs((l) => l + line);
      if (pane.current) {
        pane.current.scrollTop = pane.current.scrollHeight;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      socket.emit('command', command);
      setCommand('');
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
              height: '300px',
              overflowY: 'scroll',
              whiteSpace: 'pre-line',
              display: 'inline-block',
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
