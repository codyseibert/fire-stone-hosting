import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { AppRouter } from './AppRouter';
import { connect } from 'react-redux';
import Navigation from './components/Navigation';
import { History } from 'history';

export const App = ({ history }: { history: History }) => {
  return (
    <div>
      <Navigation history={history} />
      <ConnectedRouter history={history}>
        <AppRouter />
      </ConnectedRouter>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
