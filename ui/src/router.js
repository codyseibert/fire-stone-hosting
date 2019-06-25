import React from 'react';
import { Route, Switch } from 'react-router';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';

const routes = (
  <div>
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route component={Landing} />
    </Switch>
  </div>
);

export default routes;
