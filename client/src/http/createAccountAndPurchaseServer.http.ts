import axios from "axios";
import { API_URL } from "./config";

const createAccountAndPurchaseServerHttp = (payload: {
  email: string;
  password: string;
  passwordConfirm: string;
  planId: string;
  source: string;
}) =>
  axios
    .post(`${API_URL}/new-user-purchase`, payload)
    .then((response) => response.data);


export default createAccountAndPurchaseServerHttp