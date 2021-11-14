import { Dispatch } from "react";
import { State } from "..";
import stopServer from "../http/stopServer.http";

export default ({ serverId }: { serverId: string }) =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
    try {
      await stopServer({ serverId }, null);
    } catch (err: any) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response.data,
      });
    }
  };
