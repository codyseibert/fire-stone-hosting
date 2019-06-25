import React from "react";
import { ConnectedRouter } from "connected-react-router";
import routes from "./router";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Navbar history={this.props.history} /> */}
        <div className="container-fluid">
          <ConnectedRouter history={this.props.history}>
            {routes}
          </ConnectedRouter>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // getUserLikes: () => {
  //   dispatch(getUserLikes());
  // }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
