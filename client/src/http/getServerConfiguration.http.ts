import axios from 'axios';

const getServerConfiguration = ({
  nodeIp,
  serverId,
}: {
  serverId: string;
  nodeIp: string;
}) =>
  axios
    .get(
      `http://${nodeIp}:4444/servers/${serverId}/configuration`
    )
    .then((response) => response.data);

export default getServerConfiguration;
