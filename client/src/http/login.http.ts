import axios from "axios";
import { API_URL } from "./config";

export type LoginForm = {
  email: string;
  password: string;
}

const loginProxy = ({ email, password }: LoginForm) =>
  axios
    .post(`${API_URL}/login`, { email, password })
    .then((response) => response.data);

export default loginProxy