import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const CHECK_MOBILE_REQUEST = 'CHECK_MOBILE_REQUEST';
export const CHECK_MOBILE_SUCCESS = 'CHECK_MOBILE_SUCCESS';
export const CHECK_MOBILE_FAILURE = 'CHECK_MOBILE_FAILURE';
export const LOGIN_ALERT = 'LOGIN_ALERT';
export const LOGIN_ALERT_CLOSE = 'LOGIN_ALERT_CLOSE';


export const signupRequest = (payload: SignupPayload) => ({
    type: SIGNUP_REQUEST,
    payload
});

export const signupSuccess = (user: any, confirmationResult: any ) => ({
    type: SIGNUP_SUCCESS,
    payload: {user, confirmationResult}
});

export const signupFailure = (error: string) => ({
    type: SIGNUP_FAILURE,
    payload: { error }
});

export const checkMobileRequest = (payload: CheckMobilePayload) => ({
    type: CHECK_MOBILE_REQUEST,
    payload
});

export const checkMobileSuccess = (exists: boolean) => ({
    type: CHECK_MOBILE_SUCCESS,
    payload: { exists }
});

export const checkMobileFailure = (error: string) => ({
    type: CHECK_MOBILE_FAILURE,
    payload: { error }
});

export const loginAlert = () => ({
    type: LOGIN_ALERT,
});


export const loginAlertClose = () => ({
  type: LOGIN_ALERT_CLOSE,
});




interface SignupPayload {
    name: string;
    email: string;
    mobileNumber: string;
    // confirmationResult: ConfirmationResult | null;
} 

interface CheckMobilePayload {
    mobile: string;
    name: string;
    email: string;
}

interface ErrorPayload {
    error: string;
}

interface SignupRequestAction {
    type: typeof SIGNUP_REQUEST;
    payload: SignupPayload;
}

interface SignupSuccessAction {
    type: typeof SIGNUP_SUCCESS;
    payload: any; 
}

interface SignupFailureAction {
    type: typeof SIGNUP_FAILURE;
    payload: ErrorPayload;
}

interface CheckMobileRequestAction {
    type: typeof CHECK_MOBILE_REQUEST;
    payload: CheckMobilePayload;
}

interface CheckMobileSuccessAction {
    type: typeof CHECK_MOBILE_SUCCESS;
    payload: { exists: boolean }; 
}

interface CheckMobileFailureAction {
    type: typeof CHECK_MOBILE_FAILURE;
    payload: ErrorPayload;
}

interface LoginAlertAction {
    type: typeof LOGIN_ALERT;
}

interface LoginAlertCloseAction {
  type: typeof LOGIN_ALERT_CLOSE,
};


export type SignupActionTypes =
    | SignupRequestAction
    | SignupSuccessAction
    | SignupFailureAction
    | CheckMobileRequestAction
    | CheckMobileSuccessAction
    | CheckMobileFailureAction
    | LoginAlertAction
    | LoginAlertCloseAction

