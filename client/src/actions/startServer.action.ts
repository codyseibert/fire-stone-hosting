import { Dispatch } from "react";
import { State } from "..";
import startServer from "../http/startServer.http";

export default ({ serverId }: { serverId: string }) =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
    try {
      await startServer({ serverId }, "");
    } catch (err: any) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response.data,
      });
    }
  };
