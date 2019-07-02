import history from '../history';

export default () => async dispatch => {
  dispatch({
    type: 'SET_USER',
    payload: null,
  });
  dispatch({
    type: 'SET_TOKEN',
    payload: null,
  });
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
  history.push('/');
};
