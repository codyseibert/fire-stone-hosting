import { Action } from "./configuration.reducer";

export default (state = {}, action: Action) => {
  switch (action.type) {
    case "SET_SETTER":
      return action.payload;
    case "UPDATE_SETTER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
