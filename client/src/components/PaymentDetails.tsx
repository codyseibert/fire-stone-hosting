import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Elements } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import { State } from "..";

const PaymentDetails = ({
  plan,
  error,
}: {
  plan: {
    memory: number;
    imageSrc: string;
    name: string;
  };
  error: string;
}) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h1>Payment Details</h1>
        </div>
        <div className="col-md-6">
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

      <Elements>
        <CheckoutForm stripe={{ createSource: () => null }} />
      </Elements>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  plan: state.plan,
  error: state.error,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
