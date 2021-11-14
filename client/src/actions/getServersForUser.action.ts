import { Dispatch } from "react";
import { State } from "..";
import history from "../history";
import getServersForUser from "../http/getServersForUser.http";

export default ({ userId }: { userId: string }) =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
    try {
      const servers = await getServersForUser({
        userId,
      });
      dispatch({
        type: "SET_SERVERS",
        payload: servers,
      });
    } catch (err: any) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message,
      });
    }
  };
