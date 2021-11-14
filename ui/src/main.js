import 'babel-polyfill';
import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './reducers/rootReducer';
import history from './history';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { StripeProvider } from 'react-stripe-elements';

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

const user = JSON.parse(window.localStorage.getItem('user') || 'null');
const token = JSON.parse(window.localStorage.getItem('token') || 'null');

const getInitialState = () => {
  return {
    form: {},
    error: '',
    user: user,
    token: token,
    servers: [],
    logs: '',
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
  store.dispatch({
    type: 'SET_ERROR',
    payload: null,
  });
});

const render = () => {
  ReactDOM.render(
    <StripeProvider apiKey="pk_test_tbzPQH0dOO05i8FOcf7nveCf00eG0yQADe">
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </StripeProvider>,
    document.getElementById('root'),
  );
};

render();
