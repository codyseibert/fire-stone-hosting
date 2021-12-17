import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import { NodeContext } from './context/NodeContext';
import { getServerConfigurationApi } from '../../api/getServerConfigurationApi';
import { ServerContext } from './context/ServerContext';
import { saveServerConfigurationApi } from '../../api/saveServerConfigurationApi';

const ConfigureServer = () => {
  const { node } = useContext(NodeContext)!;
  const { server } = useContext(ServerContext)!;
  const [values, setValues] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (!server || !node) return;
    getServerConfigurationApi({
      nodeIp: node.ip,
      serverId: server.id,
    }).then((configuration) => {
      // eslint-disable-next-line no-useless-escape
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
    await saveServerConfigurationApi({
      nodeIp: node!.ip,
      serverId: server!.id,
      configuration,
    });
  };

  if (!server) return null;

  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <h4>Server Properties</h4>
        </div>
      </div>

      <div className="row mb-4">
        {Object.entries(values).map(([key, value]) => (
          <div className="col-md-4 mb-4">
            <div className="form-group">
              {/* eslint-disable-next-line no-useless-escape */}
              <label>{key.replace(/\-/g, ' ')}</label>
              <input
                className="form-control"
                value={value || ''}
                onChange={(e) =>
                  setValues({
                    ...values,
                    [key]: e.target.value,
                  })
                }
              />
            </div>
          </div>
        ))}
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
