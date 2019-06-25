import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import routes from './router';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <ConnectedRouter history={this.props.history}>
            {routes}
            </ConnectedRouter>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
