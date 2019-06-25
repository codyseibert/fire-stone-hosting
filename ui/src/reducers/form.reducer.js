export default (state = {}, action) => {
  switch (action.type) {
  case 'SET_FORM_KEY':
    return {
      ...state,
      [action.payload.key]: action.payload.value
    };
  default:
    return state;
  }
};