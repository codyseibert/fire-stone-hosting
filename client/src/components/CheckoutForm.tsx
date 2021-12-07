import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardElement,
  injectStripe,
} from 'react-stripe-elements';
import { AuthenticationContext } from '../context/AuthenticationContext';
import createAccountAndPurchaseServerHttp from '../http/createAccountAndPurchaseServer.http';
import loginProxy from '../http/login.http';

type CheckoutFormState = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
};

type CheckoutFormProps = {
  stripe: {
    createSource: (opts: any) => { source: { id: string } };
  } | null;
  planId: string;
};

const CheckoutForm = ({
  stripe,
  planId,
}: CheckoutFormProps) => {
  const navigate = useNavigate();

  const { setAuthentication } = useContext(
    AuthenticationContext
  )!;

  const [form, setForm] = useState<CheckoutFormState>({
    email: '',
    passwordConfirm: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    state: '',
    city: '',
  });

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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { source } = await stripe!.createSource({
      type: 'card',
      owner: {
        name: 'Bob Sagot',
      },
    });
    await createAccountAndPurchaseServerHttp({
      source: source.id,
      email: form.email,
      password: form.password,
      passwordConfirm: form.passwordConfirm,
      planId,
    });
    const { token, user } = await loginProxy({
      ...form,
    });
    setAuthentication({
      user,
      token,
    });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Email</label>
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
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Password</label>
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

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              defaultValue={form.passwordConfirm}
              onChange={(e) => {
                setFormKey({
                  key: 'passwordConfirm',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Name</label>
            <input
              type="name"
              className="form-control"
              defaultValue={form.name}
              onChange={(e) => {
                setFormKey({
                  key: 'name',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="phone"
              className="form-control"
              defaultValue={form.phone}
              onChange={(e) => {
                setFormKey({
                  key: 'phone',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Address</label>
            <input
              type="address"
              className="form-control"
              defaultValue={form.address}
              onChange={(e) => {
                setFormKey({
                  key: 'address',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>City</label>
            <input
              className="form-control"
              defaultValue={form.city}
              onChange={(e) => {
                setFormKey({
                  key: 'city',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label>State</label>
            <input
              className="form-control"
              defaultValue={form.state}
              onChange={(e) => {
                setFormKey({
                  key: 'state',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label>City</label>
            <input
              className="form-control"
              defaultValue={form.city}
              onChange={(e) => {
                setFormKey({
                  key: 'city',
                  value: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Card Details</label>
            <CardElement
              style={{ base: { fontSize: '18px' } }}
            />
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
  );
};

export default injectStripe(CheckoutForm);
