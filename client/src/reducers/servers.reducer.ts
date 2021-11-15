import { Server } from "../../../api/src/models/Server";
import { IAction } from "./rootReducer";

export interface IServersReducer {
  (state: Server[] | undefined, action: IAction): any;
}

const serversReducer: IServersReducer = (state = [], action: IAction) => {
  switch (action.type) {
    case "SET_SERVERS":
      return action.payload as Server[];
    default:
      return state;
  }
};

export default serversReducer;
