import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SideNavigation } from './SideNavigation';
import getServer from '../../http/getServer.http';
import { useParams } from 'react-router-dom';
import { Server } from '../../../../api/src/models/Server';
import deleteServerHttp from '../../http/deleteServer.http';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const params = useParams();
  const serverId = params.serverId!;
  const [server, setServer] = useState<Server>();
  const authentication = useContext(AuthenticationContext)
    ?.authentication!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authentication.token) {
      navigate('/');
    }
    const initialize = async () => {
      const serverFromApi = await getServer({
        serverId,
      });
      setServer(serverFromApi);
    };

    initialize();
  }, []);

  if (!server) return null;

  return (
    <>
      <div className="container header-offset">
        <div className="row mb-4">
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Your Servers</Link>
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
              {server.running ? (
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
    </>
  );
};

export default DashboardPage;
