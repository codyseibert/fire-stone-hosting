import axios from "axios";
import { API_URL } from "./config";

const purchaseServerHttp = (planId: string, token: string) =>
  axios
    .post(
      `${API_URL}/existing-user-purchase`,
      { planId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);

export default purchaseServerHttp;
