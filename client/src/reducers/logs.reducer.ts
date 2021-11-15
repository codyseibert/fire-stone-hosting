import { IAction } from "./rootReducer";

export interface ILogsReducer {
  (state: string[] | undefined, action: IAction): string[];
}

const logsReducer: ILogsReducer = (state = [], action: IAction) => {
  switch (action.type) {
    case "SET_LOGS":
      return action.payload;
    default:
      return state;
  }
};

export default logsReducer;
