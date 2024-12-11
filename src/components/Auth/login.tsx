import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkMobileRequest,  signupAlertClose } from '@/services/action/loginAction';
import { ConfirmationResult, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../config/firebase_config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import meerchikalogo from "../../../public/images/meerchikalogo.svg";
import Link from 'next/link';

interface LoginStepProps {
    onContinue: ( confirmationResult: any | null) => void;
    onClose: () => void;
    onSignup: () => void;
}

interface LoginFormValues {
    mobileNumber: string;
    password:string;
}

const LoginStep: React.FC<LoginStepProps> = ({onContinue, onClose, onSignup }) => {
    const dispatch = useDispatch();
    const { loading, mobileCheckLoading, mobileExists,signupAlert } = useSelector((state: any) => state.login);
    // const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);

   

    const SignupSchema = Yup.object().shape({
        mobileNumber: Yup.string()
            .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile number is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
    });

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            mobileNumber: '',
            password:''
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            console.log('Form values on submit:', values);
            const { mobileNumber } = values;
            dispatch(checkMobileRequest(mobileNumber)); 
        },
    });
    useEffect(() => {
        if (mobileExists !== null) {
            if (mobileExists) {
               
         signInWithEmailAndPassword(auth,mobileExists.email,formik.values.password)
                    .then((confirmationResult) => {
                        console.log('Login successfully.');
                        formik.resetForm();
                        onContinue(confirmationResult);
                        setGeneralError(null);
                    })
                    .catch((error) => {
                        console.error('Error during signInWithPhoneNumber:', error);
                        setGeneralError(error.message || 'Please try again.');
                    });
            }
            else {
                setGeneralError('Mobile number not registered. Please Signup');
                dispatch(signupAlertClose());
            }
            
        }
    }, [mobileExists, dispatch]);

    return (
        <div className="loginstep">
            <div id="sign-in-button"></div>
            <div>
                <span className="loginstep_close" onClick={onClose}>&times;</span>
                <Link href="/">
  <img src={meerchikalogo.src} height="90px" width="90px" alt="Grocery Icon" />
</Link>

            </div>
            <h1>Log in</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="loginstep_input">
                    <input
                        type="text"
                        className="loginstep_inner_input"
                        placeholder="Enter Mobile Number"
                        name="mobileNumber"
                        value={formik.values.mobileNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                        <p className="loginstep_warning">{formik.errors.mobileNumber}</p>
                    )}
                </div>
                <div className="register_input">
          <input
            type="password"
            className="register_inner_input"
            placeholder="Password"
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="register_warning">{formik.errors.password}</p>
          )}
        </div>

                {generalError && (
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Alert severity="error">
                            <AlertTitle>Info</AlertTitle>
                            {generalError}
                        </Alert>
                    </Stack>
                )}
                {/* {signupAlert && (
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Alert severity="info" onClose={() => dispatch(signupAlertClose())}>
                            <AlertTitle>Info</AlertTitle>
                            Mobile number not registered. Please sign up.
                        </Alert>
                    </Stack>
                )} */}
                <button type="submit" className="btn" disabled={loading || mobileCheckLoading}>
                    {loading || mobileCheckLoading ? 'Loading...' : 'Continue'}
                </button>
            </form>
            <p className="signup_process">
                Don't have an account? <span className="signup_link" onClick={onSignup}>Sign up</span>
            </p>
        </div>
    );
};

export default LoginStep;
