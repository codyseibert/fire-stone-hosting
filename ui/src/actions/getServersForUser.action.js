import history from '../history';
import getServersForUser from '../http/getServersForUser.http';

export default ({ userId }) => async (dispatch, getState) => {
  try {
    const servers = await getServersForUser({
      userId,
    });
    dispatch({
      type: 'SET_SERVERS',
      payload: servers,
    });
  } catch (err) {
    dispatch({
      type: 'SET_ERROR',
      payload: err.message,
    });
  }
};
