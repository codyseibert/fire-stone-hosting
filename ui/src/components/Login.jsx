import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import setPlan from '../actions/setPlan.action';
import login from '../actions/login.action';

const Login = props => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mt-2">
          <h1>Login</h1>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          {props.error && (
            <div className="row">
              <div className="col-md-12">
                <div className="alert alert-danger" role="alert">
                  <div className="row">
                    <div className="col-md-1 text-center">
                      <FontAwesomeIcon size="lg" icon="exclamation-circle" />
                    </div>
                    <div className="col-md-11">{props.error}</div>
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
              defaultValue={props.form.email}
              onChange={e => {
                props.setFormKey({
                  key: 'email',
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
              defaultValue={props.form.password}
              onChange={e => {
                props.setFormKey({
                  key: 'password',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              props.login();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  form: state.form,
  error: state.error,
  plan: state.plan,
  configuration: state.configuration,
});

const mapDispatchToProps = dispatch => ({
  setFormKey: obj => {
    dispatch(setFormKey(obj));
  },
  login: () => {
    dispatch(login());
  },
  setPlan: plan => dispatch(setPlan(plan)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
