import history from '../history';
import login from '../http/login.http';

export default () => async (dispatch, getState) => {
  const { form } = getState();
  try {
    const { user, token } = await login(form);
    dispatch({
      type: 'SET_USER',
      payload: user,
    });
    dispatch({
      type: 'SET_TOKEN',
      payload: token,
    });
    window.localStorage.setItem('token', JSON.stringify(token));
    window.localStorage.setItem('user', JSON.stringify(user));
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: 'SET_ERROR',
      payload: err.response.data,
    });
  }
};
