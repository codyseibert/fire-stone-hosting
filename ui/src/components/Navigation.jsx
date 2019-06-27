import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import purchase from '../actions/purchase.action';
import setPlan from '../actions/setPlan.action';

const Navigation = props => {
  return (
    <nav className="bg-light pt-2">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <a href="/">Fire Stone Hosting</a>
          </div>
          <div className="col-md-6 text-right">
            <a href="/purchase/pick-a-plan">
              <button type="button" className="btn btn-outline-primary mr-2">
                Purchase a Server
              </button>
            </a>

            <button type="button" className="btn btn-outline-danger mr-2">
              Logout
            </button>

            <button type="button" className="btn btn-outline-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  form: state.form,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  setFormKey: obj => {
    dispatch(setFormKey(obj));
  },
  purchase: () => {
    dispatch(purchase());
  },
  create: () => {
    dispatch(createAccount());
  },
  setPlan: plan => dispatch(setPlan(plan)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
