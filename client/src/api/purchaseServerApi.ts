import axios from 'axios';
import { API_URL } from './config';

export const purchaseServerApi = (
  planId: string,
  configuration: any,
  token: string
) =>
  axios
    .post(
      `${API_URL}/existing-user-purchase`,
      { planId, ...configuration },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);
