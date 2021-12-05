import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  // const token = useAppSelector((state) => state.authenticationReducer.token);
  const token = false;
  const navigate = useNavigate();

  return (
    <nav
      style={{ zIndex: 1000 }}
      className="position-fixed w-100 bg-light pt-2 pb-2"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex">
              <span
                className="me-auto"
                // onClick={() => navigate(token ? "/dashboard" : "/")}
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

              <button
                onClick={() => navigate('/')}
                type="button"
                className="btn btn-outline-success me-2"
              >
                Rent a Server
              </button>

              {token && (
                <button
                  // onClick={() => dispatch(logout(navigate))}
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
