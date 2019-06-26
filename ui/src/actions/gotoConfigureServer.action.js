import history from '../history';

export default ({ serverId }) => async (dispatch, getState) => {
  history.push(`/dashboard/${serverId}/configure`);
};
