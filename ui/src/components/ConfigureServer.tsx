import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import setPlan from '../actions/setPlan.action';

const ConfigureServer = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Hostname</label>
            <input
              className="form-control"
              value="funserver.firestonehosting.com"
              readOnly="readonly"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Address</label>
            <input
              className="form-control"
              value={`${props.server.ip}:${props.server.port}`}
              readOnly="readonly"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
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

            <div className="form-group">
              <label>Difficulty</label>
              <select className="form-control">
                <option>Easy</option>
                <option>Hard</option>
                <option>Brutual</option>
              </select>
            </div>
            <button
              onClick={() => {
                props.history.push('/purchase/payment-details');
              }}
              type="submit"
              className="btn btn-primary"
            >
              Save
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
  server: state.server,
  configuration: state.configuration,
});

const mapDispatchToProps = dispatch => ({
  setFormKey: obj => {
    dispatch(setFormKey(obj));
  },
  setPlan: plan => dispatch(setPlan(plan)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigureServer);
