import { ConfirmationResult } from "firebase/auth";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_ALERT = 'SIGNUP_ALERT';
export const SIGNUP_ALERT_CLOSE = 'SIGNUP_ALERT_CLOSE';
export const CHECK_MOBILE_REQUEST = 'CHECK_MOBILE_REQUEST';
export const CHECK_MOBILE_SUCCESS = 'CHECK_MOBILE_SUCCESS';
export const CHECK_MOBILE_FAILURE = 'CHECK_MOBILE_FAILURE';

export const loginRequest = (mobileNumber: string) => ({
    type: LOGIN_REQUEST as typeof LOGIN_REQUEST,
    payload: { mobileNumber }
});

export const loginSuccess = (user: any, confirmationResult: ConfirmationResult | null) => ({
    type: LOGIN_SUCCESS as typeof LOGIN_SUCCESS,
    payload: { user, confirmationResult }
});

export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE as typeof LOGIN_FAILURE,
    payload: { error }
});

export const signupAlert = () => ({
    type: SIGNUP_ALERT as typeof SIGNUP_ALERT
});

export const signupAlertClose = () => ({
    type: SIGNUP_ALERT_CLOSE as typeof SIGNUP_ALERT_CLOSE
});

export const checkMobileRequest = (mobileNumber: string) => ({
    type: CHECK_MOBILE_REQUEST as typeof CHECK_MOBILE_REQUEST,
    payload: { mobileNumber }
});

export const checkMobileSuccess = (exists: boolean) => ({
    type: CHECK_MOBILE_SUCCESS as typeof CHECK_MOBILE_SUCCESS,
    payload: { exists }
});

export const checkMobileFailure = (error: string) => ({
    type: CHECK_MOBILE_FAILURE as typeof CHECK_MOBILE_FAILURE,
    payload: { error }
});

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
    payload: { mobileNumber: string };
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: { user: any, confirmationResult: ConfirmationResult | null };
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: { error: string };
}

interface SignupAlertAction {
    type: typeof SIGNUP_ALERT;
}

interface SignupAlertCloseAction {
    type: typeof SIGNUP_ALERT_CLOSE;
}


export interface CheckMobileRequestAction {
    type: typeof CHECK_MOBILE_REQUEST;
    payload: { mobileNumber: string };
}

interface CheckMobileSuccessAction {
    type: typeof CHECK_MOBILE_SUCCESS;
    payload: { exists: boolean };
}

interface CheckMobileFailureAction {
    type: typeof CHECK_MOBILE_FAILURE;
    payload: { error: string };
}

export type LoginActionTypes = 
     CheckMobileRequestAction 
    | CheckMobileSuccessAction 
    | CheckMobileFailureAction
    | LoginRequestAction 
    | LoginSuccessAction 
    | LoginFailureAction 
    | SignupAlertAction 
    | SignupAlertCloseAction;
