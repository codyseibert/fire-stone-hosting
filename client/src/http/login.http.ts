import axios from "axios";
import { LoginForm } from "../actions/login.action";
import { API_URL } from "./config";

export default ({ email, password }: LoginForm) =>
  axios
    .post(`${API_URL}/login`, { email, password })
    .then((response) => response.data);
