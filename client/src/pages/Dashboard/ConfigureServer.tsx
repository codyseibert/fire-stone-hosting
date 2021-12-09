import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import getServer from '../../http/getServer.http';
import { useNavigate, useParams } from 'react-router-dom';
import { Server } from '../../../../api/src/models/Server';
import { NodeContext } from './context/NodeContext';
import getServerConfiguration from '../../http/getServerConfiguration.http';
import { ServerContext } from './context/ServerContext';
import saveServerConfiguration from '../../http/saveServerConfiguration.http';

const ConfigureServer = () => {
  const navigate = useNavigate();
  const { node } = useContext(NodeContext)!;
  const { server } = useContext(ServerContext)!;
  const [values, setValues] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (!server || !node) return;
    getServerConfiguration({
      nodeIp: node.ip,
      serverId: server.id,
    }).then((configuration) => {
      configuration = configuration.replace(/\#.*\n/g, '');
      const values: {
        [key: string]: string;
      } = {};
      configuration
        .split('\n')
        .map((entry: any) => entry.split('='))
        .forEach(([key, val]: string[]) => {
          if (!key || val === undefined) return;
          values[key] = val;
        });
      setValues(values);
    });
  }, [server, node]);

  const saveConfiguration = async () => {
    const configuration = Object.entries(values)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    await saveServerConfiguration({
      nodeIp: node!.ip,
      serverId: server!.id,
      configuration,
    });
  };

  if (!server) return null;

  return (
    <>
      <div className="row">
        <div className="col">
          <h4>Server Configuration</h4>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="form-group">
            <label>Hostname</label>
            <input
              className="form-control"
              value="funserver.firestonehosting.com"
              readOnly={true}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Address</label>
            <input
              className="form-control"
              value={`:${server.port}`}
              readOnly={true}
            />
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <form>
            <div className="form-group">
              <label>Max players</label>
              <input
                className="form-control"
                value={values['max-players'] || ''}
                onChange={(e) =>
                  setValues({
                    ...values,
                    'max-players': e.target.value,
                  })
                }
                // defaultValue={configuration.maxPlayers}
              />
            </div>
            {/* 
            <div className="form-group">
              <label>Difficulty</label>
              <select className="form-control">
                <option>Easy</option>
                <option>Hard</option>
                <option>Brutual</option>
              </select>
            </div> */}
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button
            onClick={saveConfiguration}
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfigureServer;
