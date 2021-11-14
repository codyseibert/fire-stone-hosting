import { Dispatch } from "react";
import { State } from "..";
import history from "../history";
import login from "../http/login.http";

export type LoginForm = {
  email: string;
  password: string;
};

export default () =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
    const { form } = getState();
    try {
      const { user, token } = await login(form as LoginForm);
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
