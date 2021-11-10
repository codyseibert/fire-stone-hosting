import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import setPlan from '../actions/setPlan.action';

import saplingImg from '../images/sapling.png';
import woodImg from '../images/wood.png';
import stoneImg from '../images/stone.png';
import ironImg from '../images/iron.png';
import goldImg from '../images/gold.png';
import diamondImg from '../images/diamond.png';
import netheriteImg from '../images/netherite.png';

const SelectAPlan = props => {
  const renderPlanCard = ({ imageSrc, memory, name, details, plan }) => {
    return (
      <div className="shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-md-4">
            <img className="w-100" src={imageSrc} />
          </div>
          <div className="col-md-8">
            <h3>{name}</h3>
            <h5>{memory} GB</h5>
            <h5>{details}</h5>
            <h5>$ {(memory * 3).toFixed(2)} / month</h5>

            <button
              type="button"
              onClick={() => {
                props.setPlan({ imageSrc, memory, name, details, plan });
              }}
              className="btn btn-outline-primary mt-2 w-100"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Pick a Plan</h1>
          <div className="alert alert-info" role="alert">
            <div className="row">
              <div className="col-md-1 text-center">
                <FontAwesomeIcon size="lg" icon="info-circle" />
              </div>
              <div className="col-md-11">
                The more players or plugins you have, the more memory you will
                need.
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc: woodImg,
            memory: 0.5,
            plan: 'plan_FM8EuuGF3C3pn3',
            name: 'Wood',
            details: 'unlimitied players',
          })}
        </div>
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc: stoneImg,
            memory: 1,
            plan: 'plan_FM8E73TqKTZIWV',
            name: 'Stone',
            details: 'unlimitied players',
          })}
        </div>
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc: ironImg,
            memory: 2,
            plan: 'plan_FM8EHhCrxNZGhd',
            name: 'Iron',
            details: 'unlimitied players',
          })}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc: goldImg,
            memory: 4,
            name: 'Gold',
            plan: 'plan_FM8EvzJrRIYn5R',
            details: 'unlimitied players',
          })}
        </div>
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc: diamondImg,
            memory: 6,
            plan: 'plan_FM8ExZxKgKh22g',
            name: 'Diamond',
            details: 'unlimitied players',
          })}
        </div>
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc: netheriteImg,
            memory: 8,
            name: 'Netherite',
            plan: 'plan_FM8En4JVkWZ43y',
            details: 'unlimitied players',
          })}
        </div>
      </div>
    </div>
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
  setPlan: plan => dispatch(setPlan(plan)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectAPlan);
