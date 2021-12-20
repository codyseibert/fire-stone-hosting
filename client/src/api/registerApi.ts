import axios from 'axios';
import { API_URL } from './config';
import { Account } from 'api/src/interactors/registerInteractor';

export const registerApi = ({
  account,
}: {
  account: Account;
}) =>
  axios
    .post(`${API_URL}/register`, account)
    .then((response) => response.data);
