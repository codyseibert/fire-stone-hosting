import { combineReducers } from 'redux';
import formReducer from './form.reducer';

import { connectRouter } from 'connected-react-router';

export default history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer
  });
