import React from "react";
import { connect } from "react-redux";
import setFormKey from "../actions/setFormKey.action";
import setPlan from "../actions/setPlan.action";
import { State } from "..";
import history from "../history";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authentication/authenticationSlice";

const Navigation = () => {
  const token = useAppSelector((state) => state.authenticationReducer.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <nav className="bg-light pt-2 mt-4 mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex">
              <span
                className="me-auto"
                onClick={() => navigate(token ? "/dashboard" : "/")}
              >
                FireStoneHosting
              </span>

              {token && (
                <button
                  onClick={() => navigate("/dashboard")}
                  type="button"
                  className="btn btn-outline-primary me-2"
                >
                  Your Servers
                </button>
              )}

              <button
                onClick={() => navigate("/purchase/pick-a-plan")}
                type="button"
                className="btn btn-outline-success me-2"
              >
                Purchase a Server
              </button>

              {token && (
                <button
                  onClick={() => dispatch(logout(navigate))}
                  type="button"
                  className="btn btn-outline-danger me-2"
                >
                  Logout
                </button>
              )}

              {!token && (
                <button
                  onClick={() => navigate("/login")}
                  type="button"
                  className="btn btn-outline-primary"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: State) => ({
  form: state.form,
  error: state.error,
  token: state.token,
});

const mapDispatchToProps = {
  setFormKey,
  logout,
  setPlan,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
