import axios from 'axios';
import { API_URL } from './config';

export const createAccountAndPurchaseServerApi = (payload: {
  email: string;
  password: string;
  passwordConfirm: string;
  planId: string;
  version: string;
}) =>
  axios
    .post(`${API_URL}/new-user-purchase`, payload)
    .then((response) => response.data);
