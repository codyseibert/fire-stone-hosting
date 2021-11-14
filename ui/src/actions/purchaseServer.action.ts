import history from '../history';
import purchaseServer from '../http/purchaseServer.http';

export default () => async (dispatch, getState) => {
  const { plan, token } = getState();
  try {
    await purchaseServer({ plan }, token);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: 'SET_ERROR',
      payload: err.response.data,
    });
  }
};
