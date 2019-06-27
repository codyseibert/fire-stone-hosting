import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import purchase from '../actions/purchase.action';
import setPlan from '../actions/setPlan.action';

const PaymentDetails = props => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h1>Payment Details</h1>
        </div>
        <div className="col-md-6">
          <div className="shadow-sm p-3 pt-4 bg-info text-white rounded">
            <h6>
              Selected Plan:{' '}
              <img src={props.plan.imageSrc} style={{ width: '30px' }} />{' '}
              {props.plan.name}, {props.plan.memory} GB, ${' '}
              {(props.plan.memory * 2.5).toFixed(2)} / month
            </h6>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={props.form.email}
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
              value={props.form.password}
              onChange={e => {
                props.setFormKey({
                  key: 'password',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>

          <div className="form-group">
            <label>Verify Password</label>
            <input
              type="password"
              className="form-control"
              value={props.form.passwordVerify}
              onChange={e => {
                props.setFormKey({
                  key: 'passwordVerify',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={() => {}}>
            Create
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
  purchase: () => {
    dispatch(purchase());
  },
  setPlan: plan => dispatch(setPlan(plan)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentDetails);
