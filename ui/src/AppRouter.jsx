import React from 'react';
import { Route, Switch } from 'react-router';
import Landing from './components/SelectAPlan';
import DashboardPage from './components/Dashboard/DashboardPage';
import ConfigureServer from './components/ConfigureServer';
import ConfigurePlan from './components/ConfigurePlan';
import CreateAccount from './components/CreateAccount';
import PaymentDetails from './components/PaymentDetails';
import Logs from './components/Logs';
import Servers from './components/Servers';
import SelectAPlan from './components/SelectAPlan';
import Login from './components/Login';
import PurchaseConfirm from './components/PurchaseConfirm';

export const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Servers} />
      <Route path="/dashboard/:serverId" component={DashboardPage} />
      <Route exact path="/purchase/select-a-plan" component={SelectAPlan} />
      <Route exact path="/purchase/configure" component={ConfigurePlan} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/purchase/create-account" component={CreateAccount} />
      <Route exact path="/purchase/confirm" component={PurchaseConfirm} />
      <Route
        exact
        path="/purchase/payment-details"
        component={PaymentDetails}
      />
      <Route component={Landing} />
    </Switch>
  );
};
