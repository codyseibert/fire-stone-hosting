import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import setFormKey from "../actions/setFormKey.action";
import setPlan from "../actions/setPlan.action";
import register from "../actions/register.action";
import { State } from "..";

const CreateAccount = ({
  form,
  plan,
  error,
}: {
  error: string;
  form: {
    email: string;
    password: string;
    passwordConfirm: string;
  };
  plan: {
    imageSrc: string;
    memory: number;
    name: string;
  };
}) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h1>Account Creation</h1>
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

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              defaultValue={form.email}
              onChange={(e) => {
                setFormKey({
                  key: "email",
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              defaultValue={form.password}
              onChange={(e) => {
                setFormKey({
                  key: "password",
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              defaultValue={form.passwordConfirm}
              onChange={(e) => {
                setFormKey({
                  key: "passwordConfirm",
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              register();
            }}
          >
            Create
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

const mapDispatchToProps = { setFormKey, register, setPlan };

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
