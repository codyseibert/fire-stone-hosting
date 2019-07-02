import React from 'react';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import createAccountAndPurchaseServer from '../actions/createAccountAndPurchaseServer.action';
import setPlan from '../actions/setPlan.action';
import { CardElement } from 'react-stripe-elements';

import { injectStripe } from 'react-stripe-elements';

const CheckoutForm = props => {
  const handleSubmit = async e => {
    e.preventDefault();
    const { source } = await props.stripe.createSource({
      type: 'card',
      owner: {
        name: 'Bob Sagot',
      },
    });

    props.createAccountAndPurchaseServer({
      source: source.id,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
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
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
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

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              defaultValue={props.form.passwordConfirm}
              onChange={e => {
                props.setFormKey({
                  key: 'passwordConfirm',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Name</label>
            <input
              type="name"
              className="form-control"
              defaultValue={props.form.name}
              onChange={e => {
                props.setFormKey({
                  key: 'name',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="phone"
              className="form-control"
              defaultValue={props.form.phone}
              onChange={e => {
                props.setFormKey({
                  key: 'phone',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Address</label>
            <input
              type="address"
              className="form-control"
              defaultValue={props.form.address}
              onChange={e => {
                props.setFormKey({
                  key: 'address',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>City</label>
            <input
              className="form-control"
              defaultValue={props.form.city}
              onChange={e => {
                props.setFormKey({
                  key: 'city',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label>State</label>
            <input
              className="form-control"
              defaultValue={props.form.state}
              onChange={e => {
                props.setFormKey({
                  key: 'state',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label>City</label>
            <input
              className="form-control"
              defaultValue={props.form.city}
              onChange={e => {
                props.setFormKey({
                  key: 'city',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Card Details</label>
            <CardElement style={{ base: { fontSize: '18px' } }} />
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-success mt-4 mb-4">
        Purchase Your Server
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  form: state.form,
  error: state.error,
  plan: state.plan,
  user: state.user,
  configuration: state.configuration,
});

const mapDispatchToProps = dispatch => ({
  setFormKey: obj => {
    dispatch(setFormKey(obj));
  },
  createAccountAndPurchaseServer: obj => {
    dispatch(createAccountAndPurchaseServer(obj));
  },
  setPlan: plan => dispatch(setPlan(plan)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectStripe(CheckoutForm));
