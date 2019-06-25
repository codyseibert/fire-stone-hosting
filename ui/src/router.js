import React from "react";
import { Route, Switch } from "react-router";
import Landing from './components/Landing';

const routes = (
  <div>
    <Switch>
      <Route component={Landing} />
    </Switch>
  </div>
);

export default routes;
