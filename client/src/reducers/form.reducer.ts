import { IAction } from "./rootReducer";

export interface IFormReducer {
  (state: any, action: IAction): any;
}

const formReducer: IFormReducer = (state = {}, action): any => {
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

export default formReducer;
