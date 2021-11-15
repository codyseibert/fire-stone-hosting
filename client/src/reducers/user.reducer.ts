import { IAction } from "./rootReducer";

export interface IUserReducer {
  (state: any | undefined, action: IAction): any;
}

const initialState: any = {};

const userReducer: IUserReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
