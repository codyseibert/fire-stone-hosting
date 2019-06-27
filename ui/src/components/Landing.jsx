import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import setFormKey from '../actions/setFormKey.action';
import purchase from '../actions/purchase.action';
import setPlan from '../actions/setPlan.action';

const Landing = props => {
  const renderPlanCard = ({ imageSrc, memory, name, details }) => {
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
            <h5>$ {(memory * 2.5).toFixed(2)} / month</h5>

            <button
              type="button"
              onClick={() => {
                props.setPlan({ imageSrc, memory, name, details });
              }}
              className="btn btn-primary mt-2 w-100"
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
            imageSrc:
              'https://gamepedia.cursecdn.com/minecraft_gamepedia/6/6a/Spruce_Sapling.png?version=2b7b5743abbda34b45fa465c078b9edb',
            memory: 0.5,
            name: 'Sapling',
            details: 'unlimitied players',
          })}
        </div>
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc:
              'https://gamepedia.cursecdn.com/minecraft_gamepedia/1/11/Wooden_Axe.png?version=88435b952db3b497a300131c9577bc76',
            memory: 1,
            name: 'Wood',
            details: 'unlimitied players',
          })}
        </div>
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc:
              'https://gamepedia.cursecdn.com/minecraft_gamepedia/4/40/Stone_Pickaxe.png?version=7ea86c614d826f39576a633fd8e30c3b',
            memory: 2,
            name: 'Stone',
            details: 'unlimitied players',
          })}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc:
              'https://gamepedia.cursecdn.com/minecraft_gamepedia/7/76/Iron_Shovel.png?version=9ad7401db7ae5b23ed6a148a9fc642c4',
            memory: 4,
            name: 'Iron',
            details: 'unlimitied players',
          })}
        </div>
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc:
              'https://gamepedia.cursecdn.com/minecraft_gamepedia/c/c6/Golden_Helmet.png?version=c608c95421103de929ea974d933cda0b',
            memory: 6,
            name: 'Gold',
            details: 'unlimitied players',
          })}
        </div>
        <div className="col-md-4">
          {renderPlanCard({
            imageSrc:
              'https://gamepedia.cursecdn.com/minecraft_gamepedia/a/a0/Diamond_Sword.png?version=d3b1fbce65ce732c68aa8b544c1b081c',
            memory: 8,
            name: 'Diamond',
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
)(Landing);
