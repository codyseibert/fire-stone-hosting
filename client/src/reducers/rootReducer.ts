import { combineReducers } from "redux";
import formReducer from "./form.reducer";
import errorReducer from "./error.reducer";
import serversReducer from "./servers.reducer";
import planReducer from "./plan.reducer";
import configurationReducer from "./configuration.reducer";
import tokenReducer from "./token.reducer";
import userReducer from "./user.reducer";
import logsReducer from "./logs.reducer";
import serverReducer from "./server.reducer";
import { History } from "history";

// import { connectRouter } from "connected-react-router";
import { State } from "..";

export type IAction = {
  type: string;
  payload: any;
};

const rootReducer = (history: History) =>
  combineReducers<State, IAction>({
    // router: connectRouter(history),
    form: formReducer,
    error: errorReducer,
    servers: serversReducer,
    plan: planReducer,
    configuration: configurationReducer,
    token: tokenReducer,
    server: serverReducer,
    user: userReducer,
    logs: logsReducer,
  });

export default rootReducer;
