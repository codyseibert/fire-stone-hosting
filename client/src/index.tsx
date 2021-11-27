import React from "react";
import { applyMiddleware, compose, createStore, Action } from "redux";
// import { routerMiddleware, RouterState } from "connected-react-router";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";
import App from "./App";
import rootReducer, { IAction } from "./reducers/rootReducer";
import history from "./history";
import { History } from "history";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { StripeProvider } from "react-stripe-elements";

import { store } from "./store";
import { Provider } from "react-redux";

import { library } from "@fortawesome/fontawesome-svg-core";
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
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeartFar } from "@fortawesome/free-regular-svg-icons";
import { Server } from "../../api/src/models/Server";

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
  faUpload
);

const user = JSON.parse(window.localStorage.getItem("user") || "null");
const token = JSON.parse(window.localStorage.getItem("token") || "null");

export interface State {
  form: any;
  // router: RouterState;
  error: string;
  user: {
    id: string;
  };
  token: string;
  servers: Server[];
  server: Server;
  logs: string[];
  plan: {
    memory: number;
    name: string;
    details: string;
    imageSrc: string;
  };
  configuration: {
    maxPlayers: number;
    motd: string;
  };
}

const getInitialState = (): State => {
  return {
    form: {},
    // router: undefined as any as RouterState,
    error: "",
    server: {
      running: false,
      id: "",
      nodeId: "",
      userId: "",
      memory: 0,
      runBackup: false,
      port: 10000,
    },
    user: user,
    token: token,
    servers: [],
    logs: [],
    plan: {
      memory: 1,
      name: "Wood",
      details: "unlimited players",
      imageSrc:
        "https://gamepedia.cursecdn.com/minecraft_gamepedia/1/11/Wooden_Axe.png?version=88435b952db3b497a300131c9577bc76",
    },
    configuration: {
      maxPlayers: 10,
      motd: "Welcome to my server!",
    },
  };
};

history.listen(() => {
  store.dispatch({
    type: "SET_ERROR",
    payload: null,
  });
});

const render = () => {
  ReactDOM.render(
    <StripeProvider apiKey="pk_test_tbzPQH0dOO05i8FOcf7nveCf00eG0yQADe">
      <Provider store={store}>
        <App />
      </Provider>
    </StripeProvider>,
    document.getElementById("root")
  );
};

render();
