import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import purchaseServer from "../actions/purchaseServer.action";
import { State } from "..";

const PaymentDetails = ({
  plan,
  error,
  purchaseServer,
}: {
  error: string;
  plan: { name: string; memory: number; imageSrc: string };
  purchaseServer: Function;
}) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mt-2">
          <h1>Confirmation</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="shadow-sm p-3 pt-4 bg-info text-white rounded">
            <h6>
              Selected Plan:{" "}
              <img src={plan.imageSrc} style={{ width: "30px" }} /> {plan.name},{" "}
              {plan.memory} GB, $ {(plan.memory * 3).toFixed(2)} / month
            </h6>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {error && (
            <div className="alert alert-danger" role="alert">
              <div className="row">
                <div className="col-md-1 text-center">
                  <FontAwesomeIcon size="lg" icon="exclamation-circle" />
                </div>
                <div className="col-md-11">{error}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <button
            onClick={() => {
              purchaseServer();
            }}
            type="button"
            className="btn btn-success mt-4 mb-4"
          >
            Purchase Your Server
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  form: state.form,
  error: state.error,
  plan: state.plan,
  configuration: state.configuration,
});

const mapDispatchToProps = {
  purchaseServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
