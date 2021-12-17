import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/loginApi';
import { AuthenticationContext } from '../context/AuthenticationContext';

const LoginPage = () => {
  // const error = useAppSelector(
  //   (state) => state.authenticationReducer.error
  // );
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { setAuthentication } = useContext(
    AuthenticationContext
  )!;

  const setFormKey = ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const login = async () => {
    const { token, user } = await loginApi({
      ...form,
    });
    setAuthentication({
      user,
      token,
    });
    navigate('/dashboard');
  };

  const error = '';

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
                <div
                  className="alert alert-danger"
                  role="alert"
                >
                  <div className="row">
                    <div className="col-md-1 text-center">
                      <FontAwesomeIcon
                        size="lg"
                        icon="exclamation-circle"
                      />
                    </div>
                    <div className="col-md-11">{}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              defaultValue={form.email}
              onChange={(e) => {
                setFormKey({
                  key: 'email',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              defaultValue={form.password}
              onChange={(e) => {
                setFormKey({
                  key: 'password',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              login();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
