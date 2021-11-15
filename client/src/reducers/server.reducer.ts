import { Server } from "../../../api/src/models/Server";
import { IAction } from "./rootReducer";

export interface IServerReducer {
  (state: Server | undefined, action: IAction): Server;
}

const initialState: Server = {
  running: false,
  id: "",
  nodeId: "",
  userId: "",
  memory: 0,
  port: 10000,
};

const serverReducer: IServerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVER":
      return action.payload;
    default:
      return state;
  }
};

export default serverReducer;
