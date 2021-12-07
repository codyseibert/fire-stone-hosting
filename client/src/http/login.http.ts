import axios from "axios";
import { API_URL } from "./config";

export type LoginForm = {
  email: string;
  password: string;
}

export type Credentials = {
    user: {
      name: string;
      id: string;
    },
    token: string,
}

export interface ILoginProxy {
  (form: LoginForm): Promise<Credentials>
}

const loginProxy: ILoginProxy = ({ email, password }) =>
  axios
    .post(`${API_URL}/login`, { email, password })
    .then((response) => response.data as Credentials);

export default loginProxy