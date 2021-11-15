import { IAction } from "./rootReducer";

export interface IErrorReducer {
  (state: string | undefined, action: IAction): string;
}

const errorReducer: IErrorReducer = (state = "", action: IAction) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.payload as string;
    default:
      return state;
  }
};

export default errorReducer;
