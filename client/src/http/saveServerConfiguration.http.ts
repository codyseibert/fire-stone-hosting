import axios from 'axios';

const saveServerConfiguration = ({
  nodeIp,
  serverId,
  configuration,
}: {
  serverId: string;
  nodeIp: string;
  configuration: string;
}) =>
  axios
    .post(
      `http://${nodeIp}:4444/servers/${serverId}/configuration`,
      configuration,
      {
        headers: {
          'Content-Type': "text/plain"
        }
      }
    )
    .then((response) => response.data);

export default saveServerConfiguration;
