import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Plan, plans } from '../data/plans';
import { useNavigate, useParams } from 'react-router-dom';
import { createAccountAndPurchaseServerApi } from '../api/createAccountAndPurchaseServerApi';
import { AuthenticationContext } from '../context/AuthenticationContext';
import loginApi from '../api/loginApi';
import * as yup from 'yup';
import classNames from 'classnames';

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
});

let error = '';

type PaymentForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
};

const initialFormState: PaymentForm = {
  email: '',
  passwordConfirm: '',
  password: '',
  name: '',
  phone: '',
  address: '',
  state: '',
  city: '',
};

export const PaymentDetailsPage = () => {
  const params = useParams();
  const planId = params.planId!;
  const [plan] = useState<Plan>(() => {
    return plans.find((p) => p.plan === planId)!;
  });

  const [errors, setErrors] = useState<PaymentForm>(
    initialFormState
  );
  const [form, setForm] = useState<PaymentForm>(
    initialFormState
  );

  const setFormKey = ({
    key,
    value,
  }: {
    key: string;
    value: any;
  }) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const navigate = useNavigate();

  const { setAuthentication } = useContext(
    AuthenticationContext
  )!;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await formSchema.validate(form, {
        abortEarly: false,
      });
    } catch (err: any) {
      // yup doesn't seem to provide a way to get an object representation of the failed properties
      setErrors(
        err.errors.reduce((acc: any, curr: any) => {
          acc[curr.split(' ')[0]] = curr;
          return acc;
        }, {})
      );
      return;
    }

    await createAccountAndPurchaseServerApi({
      source: 'abc', // todo: fix this
      email: form.email,
      password: form.password,
      passwordConfirm: form.passwordConfirm,
      planId,
    });
    const { token, user } = await loginApi({
      ...form,
    });
    setAuthentication({
      user,
      token,
    });
    navigate('/dashboard');
  };

  return (
    <div className="container header-offset">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h1>Payment Details</h1>
        </div>
        <div className="col-md-6">
          <div className="shadow-sm p-3 pt-4 bg-info text-white rounded">
            <h6>
              Selected Plan:{' '}
              <img
                src={plan.imageSrc}
                alt="plan-cover"
                style={{ width: '30px' }}
              />{' '}
              {plan.name}, {plan.memory} GB, ${' '}
              {(plan.memory * 3).toFixed(2)} / month
            </h6>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {error && (
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
                <div className="col-md-11">{error}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className={classNames('form-control', {
                  'is-invalid': errors.email,
                })}
                defaultValue={form.email}
                onChange={(e) => {
                  setFormKey({
                    key: 'email',
                    value: e.currentTarget.value,
                  });
                }}
              />
              {errors.email && (
                <span className="text-danger">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-12 mt-4">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={classNames('form-control', {
                  'is-invalid': errors.password,
                })}
                defaultValue={form.password}
                onChange={(e) => {
                  setFormKey({
                    key: 'password',
                    value: e.currentTarget.value,
                  });
                }}
              />
              {errors.password && (
                <span className="text-danger">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="form-group mt-4">
              <label>Confirm Password</label>
              <input
                type="password"
                className={classNames('form-control', {
                  'is-invalid': errors.passwordConfirm,
                })}
                defaultValue={form.passwordConfirm}
                onChange={(e) => {
                  setFormKey({
                    key: 'passwordConfirm',
                    value: e.currentTarget.value,
                  });
                }}
              />
              {errors.passwordConfirm && (
                <span className="text-danger">
                  {errors.passwordConfirm}
                </span>
              )}
            </div>
          </div>
        </div>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="form-group">
              <label>Name</label>
              <input
                type="name"
                className={classNames('form-control', {
                  'is-invalid': errors.name,
                })}
                defaultValue={form.name}
                onChange={(e) => {
                  setFormKey({
                    key: 'name',
                    value: e.currentTarget.value,
                  });
                }}
              />
              {errors.name && (
                <span className="text-danger">
                  {errors.name}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="phone"
                className={classNames('form-control', {
                  'is-invalid': errors.phone,
                })}
                defaultValue={form.phone}
                onChange={(e) => {
                  setFormKey({
                    key: 'phone',
                    value: e.currentTarget.value,
                  });
                }}
              />
              {errors.phone && (
                <span className="text-danger">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <div className="form-group">
              <label>Address</label>
              <input
                type="address"
                className={classNames('form-control', {
                  'is-invalid': errors.address,
                })}
                defaultValue={form.address}
                onChange={(e) => {
                  setFormKey({
                    key: 'address',
                    value: e.currentTarget.value,
                  });
                }}
              />
              {errors.address && (
                <span className="text-danger">
                  {errors.address}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="form-group">
              <label>City</label>
              <input
                className={classNames('form-control', {
                  'is-invalid': errors.city,
                })}
                defaultValue={form.city}
                onChange={(e) => {
                  setFormKey({
                    key: 'city',
                    value: e.currentTarget.value,
                  });
                }}
              />
              {errors.city && (
                <span className="text-danger">
                  {errors.city}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>State</label>
              <input
                className={classNames('form-control', {
                  'is-invalid': errors.state,
                })}
                defaultValue={form.state}
                onChange={(e) => {
                  setFormKey({
                    key: 'state',
                    value: e.currentTarget.value,
                  });
                }}
              />
              {errors.state && (
                <span className="text-danger">
                  {errors.state}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>City</label>
              <input
                className={classNames('form-control', {
                  'is-invalid': errors.state,
                })}
                defaultValue={form.city}
                onChange={(e) => {
                  setFormKey({
                    key: 'city',
                    value: e.currentTarget.value,
                  });
                }}
              />
              {errors.state && (
                <span className="text-danger">
                  {errors.state}
                </span>
              )}
            </div>
          </div>
        </div>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>Expiration Date</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>3 Digit Number</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success mt-4 mb-4"
        >
          Purchase Your Server
        </button>
      </form>
    </div>
  );
};
