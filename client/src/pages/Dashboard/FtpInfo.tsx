import React, { useContext } from 'react'
import { NodeContext } from './context/NodeContext';
import { ServerContext } from './context/ServerContext';

export const FtpInfo = () => {
  const { server } = useContext(ServerContext)!;
  const { node } = useContext(NodeContext)!;

  if (!server) return null;
  if (!node) return null;

  const host = node.ip;
  const port = (server.port - 25565) * 10 + 21100;
  const ftpAddress = `${host}:${port}`

  return (
    <div>
      <h3>FTP Info</h3>
      <p>You can use any FTP client to connect to <a href={`ftp://${ftpAddress}`}>ftp://{ftpAddress}</a></p>

      <div className="form-group mb-2">
        <label className='mb-2'>Username</label>
        <input 
          className="form-control"
          disabled
          value={'admin'}
        />
      </div>

      <div className="form-group mb-2">
        <label className='mb-2'>Password</label>
        <input 
          className="form-control"
          disabled
          value={'admin'} // todo: don't hardcode
        />
      </div>

      <div className="form-group mb-2">
        <label className='mb-2'>Host</label>
        <input 
          className="form-control"
          disabled
          value={host}
        />
      </div>

      <div className="form-group">
        <label className='mb-2'>Port</label>
        <input 
          className="form-control"
          disabled
          value={port}
        />
      </div>
    </div>
  )
}
