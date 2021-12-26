import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { plans } from "../data/plans";

export const SelectAPlanPage = () => {
  const error = null;
  const navigate = useNavigate();

  const renderPlanCard = ({
    imageSrc,
    memory,
    name,
    plan,
  }: {
    imageSrc: string;
    memory: number;
    name: string;
    plan: any;
  }) => {
    return (
      <div className="shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-md-4">
            <img className="w-100" src={imageSrc} alt="plan-cover" />
          </div>
          <div className="col-md-8">
            <h3>{name}</h3>
            <h5>{memory} GB</h5>
            <h5>$ {(memory * 3).toFixed(2)} / month</h5>

            <button
              type="button"
              onClick={() => {
                navigate(`/plans/${plan}/configure`);
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
                You will need more memory for higher player counts and more plugins.
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-danger" role="alert">
              <div className="row">
                <div className="col-md-1 text-center">
                  <FontAwesomeIcon size="lg" icon="exclamation-circle" />
                </div>
                <div className="col-md-11">{error}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-4">{renderPlanCard(plans[0])}</div>
        <div className="col-md-4">{renderPlanCard(plans[1])}</div>
        <div className="col-md-4">{renderPlanCard(plans[2])}</div>
      </div>
      <div className="row">
        <div className="col-md-4">{renderPlanCard(plans[3])}</div>
        <div className="col-md-4">{renderPlanCard(plans[4])}</div>
        <div className="col-md-4">{renderPlanCard(plans[5])}</div>
      </div>
    </div>
  );
};
