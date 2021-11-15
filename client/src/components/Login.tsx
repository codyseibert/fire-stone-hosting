import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login } from "../features/authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.authenticationReducer.error);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const setFormKey = ({ key, value }: { key: string; value: string }) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mt-2">
          <h1>Login</h1>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          {error && (
            <div className="row">
              <div className="col-md-12">
                <div className="alert alert-danger" role="alert">
                  <div className="row">
                    <div className="col-md-1 text-center">
                      <FontAwesomeIcon size="lg" icon="exclamation-circle" />
                    </div>
                    <div className="col-md-11">{}</div>
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

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              dispatch(login(form));
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state: State) => ({
//   form: state.form,
//   error: state.error,
//   plan: state.plan,
//   configuration: state.configuration,
// });

// const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
//   setFormKey: (props: any) => dispatch(setFormKey(props)),
//   login: (props: any) => dispatch(login()),
//   setPlan: (props: any) => dispatch(setPlan(props)),
// });

export default Login;

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
