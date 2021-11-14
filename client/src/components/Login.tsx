import React, { Dispatch } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import setFormKey from "../actions/setFormKey.action";
import setPlan from "../actions/setPlan.action";
import login from "../actions/login.action";
import { State } from "..";

const Login = ({
  error,
  form,
}: {
  error: string;
  login: Function;
  form: {
    email: string;
    password: string;
  };
}) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mt-2">
          <h1>Login</h1>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          {error && (
            <div className="row">
              <div className="col-md-12">
                <div className="alert alert-danger" role="alert">
                  <div className="row">
                    <div className="col-md-1 text-center">
                      <FontAwesomeIcon size="lg" icon="exclamation-circle" />
                    </div>
                    <div className="col-md-11">{error}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              defaultValue={form.email}
              onChange={(e) => {
                setFormKey({
                  key: "email",
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              defaultValue={form.password}
              onChange={(e) => {
                setFormKey({
                  key: "password",
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              login();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  form: state.form,
  error: state.error,
  plan: state.plan,
  configuration: state.configuration,
});

const mapDispatchToProps = {
  setFormKey,
  login,
  setPlan,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
