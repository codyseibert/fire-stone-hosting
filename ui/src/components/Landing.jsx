import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import purchase from '../actions/purchase.action';

const Landing = props => (
  <div className="container">
    {/* Welcome to Red Stone Hosting */}
    {/* <button onClick={() => props.history.push("/register")}>Register</button> */}
    <form
      onSubmit={e => {
        console.log('we are here');
        e.preventDefault();
        props.purchase();
      }}
    >
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
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="select-memory">Memory</label>
            GG
            <select
              name="memory"
              onChange={e => {
                props.setFormKey({
                  key: e.currentTarget.name,
                  value: e.currentTarget.value,
                });
              }}
              className="form-control"
              id="select-memory"
              value={props.form.memory}
            >
              <option value="0.5">0.5 GB</option>
              <option default value="1">
                1 GB
              </option>
              <option value="2">2 GB</option>
              <option value="3">3 GB</option>
              <option value="4">4 GB</option>
              <option value="5">5 GB</option>
              <option value="6">6 GB</option>
              <option value="7">7 GB</option>
              <option value="8">8 GB</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Purchase
          </button>
        </div>

        <div className="col-md-6">
          <div className="alert alert-info" role="alert">
            <div className="row">
              <div className="col-md-1 text-center">
                <FontAwesomeIcon size="lg" icon="arrow-circle-left" />
              </div>
              <div className="col-md-11">
                You&apos;ll need more memory with more players and plugins.
                <br /> You can upgrade memory at any time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);
