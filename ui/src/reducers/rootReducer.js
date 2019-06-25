import { combineReducers } from 'redux';
import setterReducer from './setter.reducer';

import { connectRouter } from 'connected-react-router';

export default history =>
  combineReducers({
    router: connectRouter(history),
    setter: setterReducer
  });
