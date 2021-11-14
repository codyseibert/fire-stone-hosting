import { Action } from "./configuration.reducer";

export default (state = {}, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};
