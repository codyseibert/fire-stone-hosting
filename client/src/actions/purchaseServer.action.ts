import { Dispatch } from "react";
import { State } from "..";
import history from "../history";
import purchaseServer from "../http/purchaseServer.http";

export default () =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
    const { plan, token } = getState();
    try {
      await purchaseServer({ plan }, token);
      history.push("/dashboard");
    } catch (err: any) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response.data,
      });
    }
  };
