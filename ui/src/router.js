import React from 'react';
import { Route, Switch } from 'react-router';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import ConfigureServer from './components/ConfigureServer';
import ConfigurePlan from './components/ConfigurePlan';
import CreateAccount from './components/CreateAccount';
import PaymentDetails from './components/PaymentDetails';

const routes = (
  <div>
    <Switch>
      <Route
        exact
        path="/dashboard/:serverId/configure"
        render={props => (
          <ConfigureServer serverId={props.match.params.serverId} />
        )}
      />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/purchase/select-a-plan" component={Landing} />
      <Route exact path="/purchase/configure" component={ConfigurePlan} />
      <Route exact path="/purchase/create-account" component={CreateAccount} />
      <Route
        exact
        path="/purchase/payment-details"
        component={PaymentDetails}
      />
      <Route component={Landing} />
    </Switch>
  </div>
);

export default routes;
