import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import setPlan from '../actions/setPlan.action';
import logout from '../actions/logout.action';

const Navigation = props => {
  return (
    <nav className="bg-light pt-2 mt-4 mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <span onClick={() => props.history.push('/')}>
              FireStoneHosting
            </span>
          </div>
          <div className="col-md-6 text-right">
            {props.token && (
              <button
                onClick={() => props.history.push('/dashboard')}
                type="button"
                className="btn btn-outline-primary mr-2"
              >
                Your Servers
              </button>
            )}

            <button
              onClick={() => props.history.push('/purchase/pick-a-plan')}
              type="button"
              className="btn btn-outline-success mr-2"
            >
              Purchase a Server
            </button>

            {props.token && (
              <button
                onClick={() => props.logout()}
                type="button"
                className="btn btn-outline-danger mr-2"
              >
                Logout
              </button>
            )}

            {!props.token && (
              <button
                onClick={() => props.history.push('/login')}
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

const mapStateToProps = state => ({
  form: state.form,
  error: state.error,
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  setFormKey: obj => {
    dispatch(setFormKey(obj));
  },
  create: () => {
    dispatch(createAccount());
  },
  logout: () => {
    dispatch(logout());
  },
  setPlan: plan => dispatch(setPlan(plan)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
