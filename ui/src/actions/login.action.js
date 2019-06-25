// import registerGym from "../http/registerGym.http";
// import registerUser from "../http/registerUser.http";
// import addUserAsGymAdmin from "../http/addUserAsGymAdmin.http";
import history from "../history";
import login from "../http/login.http";

export default () => async (dispatch, getState) => {
  const { form } = getState();
  const { user, token } = await login(form);
  dispatch({
    type: "SET_USER",
    payload: user
  });
  dispatch({
    type: "SET_TOKEN",
    payload: token
  });
  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("token", JSON.stringify(token));
  history.push(`/gyms/1`);
};
