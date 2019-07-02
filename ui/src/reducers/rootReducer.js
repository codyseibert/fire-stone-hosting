import { combineReducers } from 'redux';
import formReducer from './form.reducer';
import errorReducer from './error.reducer';
import serversReducer from './servers.reducer';
import planReducer from './plan.reducer';
import configurationReducer from './configuration.reducer';
import tokenReducer from './token.reducer';
import userReducer from './user.reducer';

import { connectRouter } from 'connected-react-router';

export default history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    error: errorReducer,
    servers: serversReducer,
    plan: planReducer,
    configuration: configurationReducer,
    token: tokenReducer,
    user: userReducer,
  });
