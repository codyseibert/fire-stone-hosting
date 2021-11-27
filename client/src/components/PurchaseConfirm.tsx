import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { plans } from "../data/plans";
import { useAppSelector } from "../hooks";
import purchaseServerHttp from "../http/purchaseServer.http";

const PaymentDetails = () => {
  const params = useParams();
  const [plan, setPlan] = useState<any>({});
  const planId: string = params.planId!;
  const token: string = useAppSelector(
    (state) => state.authenticationReducer.token
  )!;
  const navigate = useNavigate();
  const error = null;

  useEffect(() => {
    setPlan(plans.find((p) => p.plan === params.planId));
    // axios.get("");
  }, []);

  const purchaseServer = async () => {
    await purchaseServerHttp(planId, token);
    navigate("/dashboard");
  };

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

export default PaymentDetails;
