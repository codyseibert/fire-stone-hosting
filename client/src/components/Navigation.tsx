import React from "react";
import { connect } from "react-redux";
import setFormKey from "../actions/setFormKey.action";
import setPlan from "../actions/setPlan.action";
import logout from "../actions/logout.action";
import { State } from "..";
import { History } from "history";

const Navigation = ({
  history,
  token,
  logout,
}: {
  history: History;
  token: string;
  logout: Function;
}) => {
  return (
    <nav className="bg-light pt-2 mt-4 mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <span onClick={() => history.push("/")}>FireStoneHosting</span>
          </div>
          <div className="col-md-6 text-right">
            {token && (
              <button
                onClick={() => history.push("/dashboard")}
                type="button"
                className="btn btn-outline-primary mr-2"
              >
                Your Servers
              </button>
            )}

            <button
              onClick={() => history.push("/purchase/pick-a-plan")}
              type="button"
              className="btn btn-outline-success mr-2"
            >
              Purchase a Server
            </button>

            {token && (
              <button
                onClick={() => logout()}
                type="button"
                className="btn btn-outline-danger mr-2"
              >
                Logout
              </button>
            )}

            {!token && (
              <button
                onClick={() => history.push("/login")}
                type="button"
                className="btn btn-outline-primary"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: State) => ({
  form: state.form,
  error: state.error,
  token: state.token,
});

const mapDispatchToProps = {
  setFormKey,
  logout,
  setPlan,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
