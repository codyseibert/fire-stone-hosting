import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import purchase from '../actions/purchase.action';

const Landing = props => (
  <div className="container">
    {/* Welcome to Red Stone Hosting */}
    {/* <button onClick={() => props.history.push("/register")}>Register</button> */}
    <form onSubmit={() => props.purchase()}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Memory</label>
            <select onChange={(e) => props.setFormKey({
              name: e.target.name,
              value: e.target.value,
            })} className="form-control"
            id="exampleFormControlSelect1"
            value="1">
              <option value="0.5">0.5 GB</option>
              <option default
                value="1">1 GB</option>
              <option value="2">2 GB</option>
              <option value="3">3 GB</option>
              <option value="4">4 GB</option>
              <option value="5">5 GB</option>
              <option value="6">6 GB</option>
              <option value="7">7 GB</option>
              <option value="8">8 GB</option>
            </select>
          </div>
          <button type="submit"
            className="btn btn-primary">Purchase</button>
        </div>

        <div className="col-md-6">
          <div className="alert alert-info"
            role="alert">
            <div className="row">
              <div className="col-md-1 text-center">
                <FontAwesomeIcon size="lg"
                  icon="arrow-circle-left" />
              </div>
              <div className="col-md-11">
              You&apos;ll need more memory with more players and plugins.<br /> You can upgrade memory at any time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  setFormKey: event => {
    dispatch(
      setFormKey({
        key: event.target.name,
        value: event.target.value
      })
    );
  },
  purchase: event => {
    dispatch(purchase());
    event.preventDefault();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);

