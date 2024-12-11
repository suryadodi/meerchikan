// action/signupAction.ts

import { ConfirmationResult } from "firebase/auth";

export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export interface CreateUserRequestAction {
    type: typeof CREATE_USER_REQUEST;
    payload: {
      name: string;
      email: string;
      mobile: string;
    };
  }

  export interface VerifyOtpRequestAction {
    type: typeof VERIFY_OTP_REQUEST;
    payload: {
      otp: string;
      confirmationResult: ConfirmationResult;
      userDetails: { name: string, 
                    email:string
                    mobile: string }   
     };
  }

export const verifyOtpRequest = (otp: string, confirmationResult: ConfirmationResult, userDetails: { name: string; email: string; mobile: string }) => ({
  type: VERIFY_OTP_REQUEST,
  payload: { otp, confirmationResult, userDetails }
});



export const verifyOtpSuccess = () => ({
  type: VERIFY_OTP_SUCCESS,
});

export const verifyOtpFailure = (error: string) => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});

export const createUserRequest = (name: string, email: string, mobile: string) => ({
  type: CREATE_USER_REQUEST,
  payload: { name, email, mobile }
});

export const createUserSuccess = () => ({
  type: CREATE_USER_SUCCESS,
});

export const createUserFailure = (error: string) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});
