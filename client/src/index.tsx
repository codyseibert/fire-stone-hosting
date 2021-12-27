import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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
  faPowerOff,
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
  faShippingFast,
  faDatabase,
  faShieldAlt,
  faFolderOpen,
  faPlug,
  faNetworkWired,
  faHeartbeat,
  faGlobe,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeartFar } from '@fortawesome/free-regular-svg-icons';

library.add(
  faIgloo,
  faSync,
  faExclamationCircle,
  faTape,
  faHeartbeat,
  faPowerOff,
  faChartBar,
  faCaretLeft,
  faInfoCircle,
  faArrowCircleLeft,
  faSpinner,
  faShippingFast,
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
  faShippingFast,
  faUsers,
  faDatabase,
  faShieldAlt,
  faFolderOpen,
  faChartLine,
  faTerminal,
  faPlug,
  faNetworkWired,
  faGlobe,
  faCogs,
  faSignOutAlt,
  faSearch,
  faUpload
);

const render = () => {
  ReactDOM.render(
    <StripeProvider apiKey="pk_test_tbzPQH0dOO05i8FOcf7nveCf00eG0yQADe">
      <App />
    </StripeProvider>,
    document.getElementById('root')
  );
};

render();
