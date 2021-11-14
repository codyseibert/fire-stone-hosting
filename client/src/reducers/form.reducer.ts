import { Action } from "./configuration.reducer";

export default (state = {}, action: Action) => {
  switch (action.type) {
    case "SET_FORM_KEY":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};
