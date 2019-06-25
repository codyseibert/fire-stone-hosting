import history from '../history';
import purchase from '../http/purchase.http';

export default () => async (dispatch, getState) => {
  const { form } = getState();
  try {
    await purchase(form);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: 'SET_ERROR',
      payload: err.message,
    });
  }
};
