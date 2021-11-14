import { Dispatch } from "react";
import { State } from "..";
import history from "../history";
import register from "../http/register.http";

export default () =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
    const { form } = getState();

    try {
      await register({
        account: form,
      });
      history.push("/purchase/payment-details");
    } catch (err: any) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response.data,
      });
    }
  };
