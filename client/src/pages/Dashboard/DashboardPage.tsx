import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SideNavigation } from './SideNavigation';
import { getServerApi } from '../../api/getServerApi';
import { useParams } from 'react-router-dom';
import { Server } from '../../../../api/src/models/Server';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { Link } from 'react-router-dom';
import { ServerContext } from './context/ServerContext';
import { ServerNode } from '../../../../api/src/models/ServerNode';
import { getNodeApi } from '../../api/getNodeApi';
import { NodeContext } from './context/NodeContext';

const DashboardPage = () => {
  const params = useParams();
  const serverId = params.serverId!;
  const [server, setServer] = useState<Server>();
  const [node, setNode] = useState<ServerNode>();
  const authentication = useContext(AuthenticationContext)
    ?.authentication!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authentication.token) {
      navigate('/');
    }
    getServerApi({
      serverId,
    }).then((serverFromApi) => setServer(serverFromApi));
  }, [authentication.token, navigate, setServer, serverId]);

  useEffect(() => {
    const run = async () => {
      if (!server) return;
      const nodeReturned = await getNodeApi({
        nodeId: server.nodeId,
      });
      setNode(nodeReturned);
    };
    run();
  }, [server]);

  if (!server) return null;

  return (
    <ServerContext.Provider value={{ server, setServer }}>
      <NodeContext.Provider value={{ node, setNode }}>
        <div className="container header-offset">
          <div className="row mb-4">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">
                      Your Servers
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                  >
                    funserver.firestonehosting.com
                  </li>
                </ol>
              </nav>
              <h1>
                Fun Server
                {!!server.restart ? (
                  <span className="ms-4 badge bg-warning">
                    Restarting
                  </span>
                ) : server.running ? (
                  <span className="ms-4 badge bg-success">
                    Online
                  </span>
                ) : (
                  <span className="ms-4 badge bg-secondary">
                    Offline
                  </span>
                )}
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2">
              <SideNavigation serverId={serverId} />
            </div>

            <div className="col-md-10">
              <Outlet />
            </div>
          </div>
        </div>
      </NodeContext.Provider>
    </ServerContext.Provider>
  );
};

export default DashboardPage;
