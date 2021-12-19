import axios from "axios";

export const getServerConfigurationApi = ({
  nodeIp,
  serverId,
}: {
  serverId: string;
  nodeIp: string;
}) =>
  axios
    .get(`http://${nodeIp}:4444/servers/${serverId}/configuration`)
    .then((response) => response.data);
