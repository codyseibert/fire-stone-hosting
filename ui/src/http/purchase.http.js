import axios from "axios";
import { API_URL } from "./config";

export default form =>
  axios.post(`${API_URL}/purchase/cb`, form).then(response => response.data);
