import 'babel-polyfill';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './reducers/rootReducer';
import history from './history';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faIgloo,
  faSync,
  faSpinner,
  faPaperPlane,
  faHome,
  faTh,
  faRoute,
  faChartBar,
  faUsers,
  faSignOutAlt,
  faSearch,
  faTape,
  faTimes,
  faCaretLeft,
  faArchive,
  faHeart,
  faCheck,
  faArrowCircleLeft,
  faInfoCircle,
  faCogs,
  faUpload,
  faTerminal,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeartFar } from '@fortawesome/free-regular-svg-icons';

library.add(
  faIgloo,
  faSync,
  faExclamationCircle,
  faTape,
  faChartBar,
  faCaretLeft,
  faInfoCircle,
  faArrowCircleLeft,
  faSpinner,
  faPaperPlane,
  faCheck,
  faArchive,
  faTimes,
  farHeartFar,
  faHome,
  faTerminal,
  faTh,
  faHeart,
  faRoute,
  faUsers,
  faCogs,
  faSignOutAlt,
  faSearch,
  faUpload,
);

const getInitialState = () => {
  return {
    form: {},
    error: '',
    servers: [],
    plan: {
      memory: 1,
      name: 'Wood',
      details: 'unlimited players',
      imageSrc:
        'https://gamepedia.cursecdn.com/minecraft_gamepedia/1/11/Wooden_Axe.png?version=88435b952db3b497a300131c9577bc76',
    },
    configuration: {
      maxPlayers: 10,
      motd: 'Welcome to my server!',
    },
  };
};

/* eslint-disable no-underscore-dangle */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-enable */
const store = createStore(
  rootReducer(history),
  getInitialState(),
  composeEnhancer(applyMiddleware(thunk, routerMiddleware(history))),
);

history.listen((location, action) => {
  console.log(
    store.dispatch({
      type: 'SET_ERROR',
      payload: null,
    }),
  );
  console.log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`,
  );
  console.log(`The last navigation action was ${action}`);
});

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root'),
  );
};

render();
