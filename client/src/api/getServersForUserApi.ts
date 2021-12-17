import axios from 'axios';
import { API_URL } from './config';

export const getServersForUserApi = ({
  userId,
}: {
  userId: string;
}) =>
  axios
    .get(`${API_URL}/users/${userId}/servers`)
    .then((response) => response.data);
