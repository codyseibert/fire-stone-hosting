import { IAction } from "./rootReducer";

export interface IPlanReducer {
  (state: any | undefined, action: IAction): any;
}

const planReducer = (state = {}, action: IAction) => {
  switch (action.type) {
    case "SET_PLAN":
      return action.payload;
    default:
      return state;
  }
};

export default planReducer;
