import { combineReducers } from 'redux';
import formReducer from './form.reducer';
import errorReducer from './error.reducer';
import serversReducer from './servers.reducer';

import { connectRouter } from 'connected-react-router';

export default history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    error: errorReducer,
    servers: serversReducer,
  });
