import axios from "axios";
import { API_URL } from "./config";

const deleteServerHttp = (serverId: string, token: string) =>
  axios
    .delete(`${API_URL}/servers/${serverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);

export default deleteServerHttp;
