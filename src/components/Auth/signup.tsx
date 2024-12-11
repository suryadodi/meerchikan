import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkMobileRequest, loginAlertClose } from '@/services/action/signupAction';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase_config';
import meerchikalogo from "../../../public/images/meerchikalogo.svg";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

interface SignupStepProps {
  // onContinue: (mobile: string, name: string, email: string) => void;
  onClose: () => void;
}

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
}

const SignupStep: React.FC<SignupStepProps> = ({  onClose }) => {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { loading, mobileChecking, showLoginAlert, mobileExists } = useSelector((state: any) => state.signup);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobileNumber: Yup.string().matches(/^\d{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
  });
  const generateEmail = (name: string, mobileNumber: string): string => {
    const namePart = name.slice(0, 4).toLowerCase();
    
    return `${namePart}${mobileNumber}@gmail.com`;
  };
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      name: '',
      mobileNumber: '',
      password: '',
      email: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setGeneralError(null); 
     
      console.log('Form values on submit:', values);
      const { mobileNumber, name, email } = values;
      // Directly proceed with checking the mobile number without reCAPTCHA verification
      dispatch(checkMobileRequest({ name, email, mobile: mobileNumber }));      
    },
  });

  useEffect(() => {
    if (mobileExists !== null) {
      if (!mobileExists) {
        createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
          .then((userCredential) => {
            console.log('User created successfully');
            formik.resetForm();
            setGeneralError(null);
            onClose();
          })
          .catch((error: any) => {
            setGeneralError(error.message || 'Failed to create account. Please try again.');
          });
      } else {
        setGeneralError('Mobile number already exists.');
        dispatch(loginAlertClose());
      }
    }
  }, [mobileExists, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    formik.setFieldValue(field, value);
    formik.setFieldError(field, '');
    setGeneralError(null);
    if (formik.values.name && formik.values.mobileNumber) {
      const generatedEmail = generateEmail(formik.values.name, formik.values.mobileNumber);
      formik.setFieldValue('email', generatedEmail);
    }
  };

  return (
    <div className="register">
      <div>
        <span className="register_close" onClick={onClose}>
          &times;
        </span>
        <Link href="/">
  <img src={meerchikalogo.src} height="90px" width="90px" alt="Grocery Icon" />
</Link>

      </div>
      <h1>Sign up</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="register_input">
          <input
            type="text"
            className="register_inner_input"
            placeholder="Name"
            value={formik.values.name}
            onChange={(e) => handleChange(e, 'name')}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="register_warning">{formik.errors.name}</p>
          )}
        </div>

        <div className="register_input">
          <input
            type="tel"
            className="register_inner_input"
            placeholder="Mobile Number"
            value={formik.values.mobileNumber}
            onChange={(e) => handleChange(e, 'mobileNumber')}
          />
          {formik.touched.mobileNumber && formik.errors.mobileNumber && (
            <p className="register_warning">{formik.errors.mobileNumber}</p>
          )}
        </div>

        <div className="register_input">
          <input
            type="password"
            className="register_inner_input"
            placeholder="Password"
            value={formik.values.password}
            onChange={(e) => handleChange(e, 'password')}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="register_warning">{formik.errors.password}</p>
          )}
        </div>

        {generalError && (
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {generalError}
            </Alert>
          </Stack>
        )}

        {showLoginAlert && (
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="warning">
              <AlertTitle>Alert</AlertTitle>
              Mobile number already exists.
            </Alert>
          </Stack>
        )}

        <button className="btn" type="submit" disabled={loading || mobileChecking}>
          {loading || mobileChecking ? 'Loading...' : 'Continue'}
        </button>
        <p className="register_conditions">
          By continuing, you agree to our Terms of <br /> service & Privacy policy
        </p>
      </form>
    </div>
  );
};

export default SignupStep;
