export default (state = '', action) => {
  switch (action.type) {
    case 'SET_LOGS':
      return action.payload;
    default:
      return state;
  }
};
