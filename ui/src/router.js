import React from 'react';
import { Route, Switch } from 'react-router';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import ConfigureServer from './components/ConfigureServer';
import ConfigurePlan from './components/ConfigurePlan';
import CreateAccount from './components/CreateAccount';
import PaymentDetails from './components/PaymentDetails';
import Logs from './components/Logs';
import Servers from './components/Servers';
import Login from './components/Login';
import PurchaseConfirm from './components/PurchaseConfirm';

const routes = (
  <Switch>
    {/* <Route
      exact
      path="/dashboard/:serverId/configure"
      render={props => (
        <ConfigureServer serverId={props.match.params.serverId} />
      )}
    /> */}
    <Route exact path="/dashboard" component={Servers} />
    <Route path="/dashboard/:serverId" component={Dashboard} />
    {/* <Route exact path="/dashboard/:serverId/logs" component={Logs} /> */}
    <Route exact path="/purchase/select-a-plan" component={Landing} />
    <Route exact path="/purchase/configure" component={ConfigurePlan} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/purchase/create-account" component={CreateAccount} />
    <Route exact path="/purchase/confirm" component={PurchaseConfirm} />
    <Route exact path="/purchase/payment-details" component={PaymentDetails} />
    <Route component={Landing} />
  </Switch>
);

export default routes;
