import React, { useEffect, useState } from "react";
import history from "../history";
import { Server } from "../../../api/src/models/Server";
import getServersForUserHttp from "../http/getServersForUser.http";
import { useNavigate } from "react-router-dom";

const ServersPage = () => {
  return null;

  // const { id: userId } = useAppSelector(
  //   (state) => state.authenticationReducer.user
  // );
  // // const servers = useAppSelector((state) => state.serversReducer.servers);
  // // const dispatch = useAppDispatch();
  // const [servers, setServers] = useState([]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const getServers = async () => {
  //     const serversForCurrentUser = await getServersForUserHttp({ userId });
  //     setServers(serversForCurrentUser);
  //   };
  //   getServers();
  // }, []);

  // const renderServerRow = (server: Server) => (
  //   <tr key={server.id}>
  //     <td>Fun Server</td>
  //     <td>:{server.port}</td>
  //     <td>funserver.firestonehosting.com</td>
  //     <td>
  //       {server.running ? (
  //         <span className="badge bg-success">Online</span>
  //       ) : (
  //         <span className="badge bg-secondary">Offline</span>
  //       )}
  //     </td>
  //     <td>12</td>
  //     <td>
  //       <button
  //         onClick={() => navigate(`/dashboard/${server.id}/configure`)}
  //         type="button"
  //         className="btn btn-outline-primary mr-2"
  //       >
  //         View
  //       </button>
  //     </td>
  //   </tr>
  // );

  // return (
  //   <div className="container">
  //     <div className="row">
  //       <div className="col-md-12">
  //         <h1>Your Servers</h1>
  //       </div>
  //     </div>

  //     <div className="row">
  //       <div className="col-md-12">
  //         <table className="table table-striped">
  //           <thead>
  //             <tr>
  //               <th scope="col">Name</th>
  //               <th scope="col">Hostname</th>
  //               <th scope="col">Server Address</th>
  //               <th scope="col">Status</th>
  //               <th scope="col">Players</th>
  //               <th scope="col">Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>{servers.map(renderServerRow)}</tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ServersPage;
