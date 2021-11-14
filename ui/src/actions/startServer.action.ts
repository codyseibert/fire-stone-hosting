import startServer from '../http/startServer.http';

export default ({ serverId }) => async dispatch => {
  try {
    await startServer({ serverId }, null);
  } catch (err) {
    dispatch({
      type: 'SET_ERROR',
      payload: err.response.data,
    });
  }
};
