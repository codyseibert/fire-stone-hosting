import stopServer from '../http/stopServer.http';

export default ({ serverId }) => async dispatch => {
  try {
    await stopServer({ serverId });
  } catch (err) {
    dispatch({
      type: 'SET_ERROR',
      payload: err.response.data,
    });
  }
};
