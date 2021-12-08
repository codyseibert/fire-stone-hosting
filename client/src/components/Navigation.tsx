import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../context/AuthenticationContext';

const Navigation = () => {
  const { authentication, setAuthentication } = useContext(
    AuthenticationContext
  )!;

  const token = authentication?.token;
  const navigate = useNavigate();

  const logout = () => {
    setAuthentication(undefined);
    navigate('/');
  };

  return (
    <nav
      style={{
        zIndex: 1000,
        top: 0,
      }}
      className="position-fixed w-100 bg-light pt-2 pb-2"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex">
              <span
                className="me-auto"
                onClick={() =>
                  navigate(token ? '/dashboard' : '/')
                }
              >
                FireStoneHosting
              </span>

              {token && (
                <button
                  onClick={() => navigate('/dashboard')}
                  type="button"
                  className="btn btn-outline-primary me-2"
                >
                  Your Servers
                </button>
              )}

              {token && (
                <button
                  onClick={() => navigate('/plans')}
                  type="button"
                  className="btn btn-outline-success me-2"
                >
                  Rent Server
                </button>
              )}

              {token && (
                <button
                  onClick={() => logout()}
                  type="button"
                  className="btn btn-outline-danger me-2"
                >
                  Logout
                </button>
              )}

              {!token && (
                <button
                  onClick={() => navigate('/login')}
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

export default Navigation;
