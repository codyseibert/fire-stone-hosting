import { Dispatch } from "react";
import { State } from "..";
import history from "../history";
import purchase from "../http/createAccountAndPurchaseServer.http";

const createAccountAndPurchaseServerAction =
  ({ source }: any) =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
    const { plan, form } = getState();
    try {
      const { token, user } = await purchase({ user: form, plan, source });
      dispatch({
        type: "SET_USER",
        payload: user,
      });
      dispatch({
        type: "SET_TOKEN",
        payload: token,
      });
      window.localStorage.setItem("token", JSON.stringify(token));
      window.localStorage.setItem("user", JSON.stringify(user));
      history.push("/dashboard");
    } catch (err: any) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response.data,
      });
    }
  };

export default createAccountAndPurchaseServerAction;
