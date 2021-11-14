export default (state = [], action) => {
  switch (action.type) {
    case 'SET_SERVERS':
      return action.payload;
    default:
      return state;
  }
};
