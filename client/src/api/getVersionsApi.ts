import axios from 'axios';
import { API_URL } from './config';
import { MCVersion } from 'api/src/models/MCVersion';

export interface IGetVersions {
  (): Promise<MCVersion[]>;
}

export const getVersionsApi: IGetVersions = () =>
  axios
    .get(`${API_URL}/versions`)
    .then((response) => response.data);
