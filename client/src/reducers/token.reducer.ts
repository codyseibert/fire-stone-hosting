import { IAction } from "./rootReducer";

export interface ITokenReducer {
  (state: string | undefined, action: IAction): string;
}

const tokenReducer: ITokenReducer = (state = "", action: IAction) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;
    default:
      return state;
  }
};

export default tokenReducer;
