import history from '../history';

export default payload => async dispatch => {
  dispatch({
    type: 'SET_PLAN',
    payload,
  });
  history.push('/purchase/configure');
};
