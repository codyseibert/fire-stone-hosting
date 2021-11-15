import { Dispatch } from "react";
import getServer from "../http/getServer.http";

export type getServerActionOptions = {
  serverId: string;
};

export interface ThunkAction {
  (dispatch: Dispatch<any>): Promise<void>;
}

export interface getServerActionInterface {
  (opts: getServerActionOptions): Promise<ThunkAction>;
}

const getServerAction: getServerActionInterface =
  async ({ serverId }) =>
  async (dispatch: Dispatch<object>) => {
    try {
      const server = await getServer({
        serverId,
      });
      dispatch({
        type: "SET_SERVER",
        payload: server,
      });
    } catch (err: any) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message,
      });
    }
  };

export default getServerAction;
