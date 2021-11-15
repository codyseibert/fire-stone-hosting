import React from "react";
import { AppRouter } from "./AppRouter";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import { History } from "history";
import { BrowserRouter } from "react-router-dom";

export const App = ({ history }: { history: History }) => {
  return (
    <div>
      <Navigation history={history} />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
