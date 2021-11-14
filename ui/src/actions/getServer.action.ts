import history from '../history';
import getServer from '../http/getServer.http';

export default ({ serverId }) => async (dispatch, getState) => {
  try {
    const server = await getServer({
      serverId,
    });
    dispatch({
      type: 'SET_SERVER',
      payload: server,
    });
  } catch (err) {
    dispatch({
      type: 'SET_ERROR',
      payload: err.message,
    });
  }
};
