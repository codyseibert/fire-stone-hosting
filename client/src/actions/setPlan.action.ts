import { Dispatch } from "react";
import { State } from "..";
import history from "../history";

export default (payload: object) =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
    const { token } = getState();
    dispatch({
      type: "SET_PLAN",
      payload,
    });
    if (token) {
      history.push("/purchase/confirm");
    } else {
      history.push("/purchase/payment-details");
    }
  };
