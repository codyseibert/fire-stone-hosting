import { Dispatch } from "react";
import { State } from "..";
import getServer from "../http/getServer.http";

export default ({ serverId }: { serverId: string }) =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
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
