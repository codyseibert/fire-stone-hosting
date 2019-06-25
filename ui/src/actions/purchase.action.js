import history from '../history';
import purchase from '../http/purchase.http';

export default () => async (dispatch, getState) => {
  const { form } = getState();
  await purchase(form);
  history.push('/dashboard');
};
