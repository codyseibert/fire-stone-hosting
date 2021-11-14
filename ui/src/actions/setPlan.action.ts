import history from '../history';

export default payload => async (dispatch, getState) => {
  const { token } = getState();
  dispatch({
    type: 'SET_PLAN',
    payload,
  });
  if (token) {
    history.push('/purchase/confirm');
  } else {
    history.push('/purchase/payment-details');
  }
};
