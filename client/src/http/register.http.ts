import axios from "axios";
import { API_URL } from "./config";

export default ({ account }: { account: object }) =>
  axios.post(`${API_URL}/register`, account).then((response) => response.data);
