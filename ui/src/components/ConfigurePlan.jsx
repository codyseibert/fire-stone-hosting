import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import purchase from '../actions/purchase.action';
import setPlan from '../actions/setPlan.action';

const ConfigurePlan = props => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h1>Customize Your Server</h1>
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

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            <div className="row">
              <div className="col-md-1 text-center">
                <FontAwesomeIcon size="lg" icon="info-circle" />
              </div>
              <div className="col-md-11">
                You can always modify these server configurations later.
              </div>
            </div>
          </div>

          <form>
            <div className="form-group">
              <label>Max players</label>
              <input
                className="form-control"
                defaultValue={props.configuration.maxPlayers}
              />
            </div>

            <div className="form-group">
              <label>Message of the day</label>
              <input
                className="form-control"
                defaultValue={props.configuration.motd}
              />
            </div>
            <button
              onClick={() => {
                props.history.push('/purchase/create-account');
              }}
              type="submit"
              className="btn btn-primary"
            >
              Continue
            </button>
          </form>
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
)(ConfigurePlan);
