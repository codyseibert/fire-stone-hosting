import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Server } from '../../../api/src/models/Server';
import { getServersForUserApi } from '../api/getServersForUserApi';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../context/AuthenticationContext';

const ServersPage = () => {
  const authentication = useContext(
    AuthenticationContext
  )?.authentication;

  const userId = authentication?.user.id;
  const [servers, setServers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authentication?.token) {
      navigate('/');
    }

    const getServers = async () => {
      const serversForCurrentUser =
        await getServersForUserApi({
          userId: userId!,
        });

      setServers(serversForCurrentUser);
    };

    getServers();
  }, [authentication?.token, userId, setServers, navigate]);

  const renderServerRow = (server: Server) => (
    <tr key={server.id}>
      <td>Fun Server</td>
      <td>:{server.port}</td>
      <td>funserver.firestonehosting.com</td>
      <td>
        {server.running ? (
          <span className="badge bg-success">Online</span>
        ) : (
          <span className="badge bg-secondary">
            Offline
          </span>
        )}
      </td>
      <td>
        <button
          onClick={() =>
            navigate(`/dashboard/${server.id}/overview`)
          }
          type="button"
          className="btn btn-outline-primary mr-2"
        >
          View
        </button>
      </td>
    </tr>
  );

  return (
    <div className="container header-offset">
      <div className="row">
        <div className="col-md-12">
          <h1>Your Servers</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Hostname</th>
                <th scope="col">Server Address</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{servers.map(renderServerRow)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServersPage;
