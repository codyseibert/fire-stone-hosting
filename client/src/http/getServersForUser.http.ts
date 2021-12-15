import axios from "axios";
import { API_URL } from "./config";

const getServerForUser = ({ userId }: { userId: string }) =>
  axios
    .get(`${API_URL}/users/${userId}/servers`)
    .then((response) => response.data);

export default getServerForUser;
