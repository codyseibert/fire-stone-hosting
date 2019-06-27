import history from '../history';
import register from '../http/register.http';

export default () => async (dispatch, getState) => {
  const { form } = getState();

  try {
    await register({
      account: form,
    });
    history.push('/purchase/payment-details');
  } catch (err) {
    dispatch({
      type: 'SET_ERROR',
      payload: err.response.data,
    });
  }
};
