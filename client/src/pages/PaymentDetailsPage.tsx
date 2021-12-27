import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Plan, plans } from '../data/plans';
import { useNavigate, useParams } from 'react-router-dom';
import { createAccountAndPurchaseServerApi } from '../api/createAccountAndPurchaseServerApi';
import { AuthenticationContext } from '../context/AuthenticationContext';
import loginApi from '../api/loginApi';
import * as yup from 'yup';
import classNames from 'classnames';
import { ConfigurationContext } from './Dashboard/context/ConfigurationContext';

type PaymentForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  card: string;
  securityCode: string;
  expirationDate: string;
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
  zip: '',
  card: '',
  securityCode: '',
  expirationDate: '',
};

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  card: yup.string().required(),
  securityCode: yup.string().required(),
  expirationDate: yup.string().required(),
});

const validate = async ({
  form,
  setErrors,
  hasSubmitted,
}: {
  form: any;
  setErrors: Function;
  hasSubmitted: boolean;
}) => {
  if (!hasSubmitted) return;
  try {
    await formSchema.validate(form, {
      abortEarly: false,
    });
    setErrors(initialFormState);
  } catch (err: any) {
    console.log('err', err);
    setErrors(
      err.errors.reduce((acc: any, curr: any) => {
        acc[curr.split(' ')[0]] = curr;
        return acc;
      }, {})
    );
  }
};

const PaymentInput = ({
  form,
  setFormKey,
  errors,
  formKey,
  title,
  validate,
  type = 'text',
}: {
  form: any;
  setFormKey: (obj: any) => void;
  errors: any;
  formKey: string;
  title: string;
  validate: Function;
  type?: string;
}) => {
  return (
    <div className="form-group">
      <label>{title}</label>
      <input
        key={`input.${formKey}`}
        type={type}
        className={classNames('form-control', {
          'is-invalid': errors[formKey],
        })}
        defaultValue={form[formKey]}
        onChange={(e) => {
          setFormKey({
            key: formKey,
            value: e.currentTarget.value,
          });
        }}
      />
      {errors[formKey] && (
        <span className="text-danger">
          {errors[formKey]}
        </span>
      )}
    </div>
  );
};

export const PaymentDetailsPage = () => {
  const params = useParams();
  const planId = params.planId!;
  const [plan] = useState<Plan>(() => {
    return plans.find((p) => p.plan === planId)!;
  });

  const [error, setError] = useState<string>('');

  const [hasSubmitted, setHasSubmitted] =
    useState<boolean>(false);

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

  const { configuration } = useContext(
    ConfigurationContext
  )!;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

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

    try {
      await createAccountAndPurchaseServerApi({
        email: form.email,
        password: form.password,
        passwordConfirm: form.passwordConfirm,
        planId,
        version: configuration!.version,
      });
      const { token, user } = await loginApi({
        ...form,
      });
      setAuthentication({
        user,
        token,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    validate({ form, setErrors, hasSubmitted });
  }, [form, hasSubmitted]);

  const formHelpers = {
    setFormKey,
    validate,
    form,
    errors,
  };

  return (
    <div className="container header-offset">
      <div className="row mb-4">
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
            <PaymentInput
              {...formHelpers}
              formKey="email"
              type="email"
              title="Email"
            />
          </div>

          <div className="col-md-12 mt-4">
            <PaymentInput
              {...formHelpers}
              key="password"
              formKey="password"
              type="password"
              title="Password"
            />
          </div>

          <div className="col-md-12 mt-4">
            <PaymentInput
              {...formHelpers}
              key="passwordConfirm"
              formKey="passwordConfirm"
              type="password"
              title="Confirm Password"
            />
          </div>
        </div>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6">
            <PaymentInput
              {...formHelpers}
              key="name"
              formKey="name"
              title="Name"
            />
          </div>

          <div className="col-md-6">
            <PaymentInput
              {...formHelpers}
              key="phone"
              formKey="phone"
              title="Phone"
              type="phone"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <PaymentInput
              {...formHelpers}
              key="address"
              formKey="address"
              title="Address"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-4">
            <PaymentInput
              {...formHelpers}
              key="city"
              formKey="city"
              title="City"
            />
          </div>

          <div className="col-md-4">
            <PaymentInput
              {...formHelpers}
              key="state"
              formKey="state"
              title="State"
            />
          </div>

          <div className="col-md-4">
            <PaymentInput
              {...formHelpers}
              key="zip"
              formKey="zip"
              title="Zip Code"
            />
          </div>
        </div>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6">
            <PaymentInput
              {...formHelpers}
              key="card"
              formKey="card"
              title="Card Number"
            />
          </div>
          <div className="col-md-3">
            <PaymentInput
              {...formHelpers}
              key="expirationDate"
              formKey="expirationDate"
              title="Expiration Date"
            />
          </div>
          <div className="col-md-3">
            <PaymentInput
              {...formHelpers}
              key="securityCode"
              formKey="securityCode"
              title="Security Code"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success mt-4 mb-4"
        >
          Purchase Server
        </button>
      </form>
    </div>
  );
};
