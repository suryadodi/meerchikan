import { ConfirmationResult } from 'firebase/auth';
import { 
    CHECK_MOBILE_REQUEST, CHECK_MOBILE_SUCCESS, CHECK_MOBILE_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_ALERT, SIGNUP_ALERT_CLOSE,
    LoginActionTypes 
} from '../action/loginAction';

interface LoginState {
    loading: boolean;
    error: string | null;
    user:any;
    confirmationResult: ConfirmationResult | null;
    signupAlert: boolean;
    mobileCheckLoading: boolean;
    mobileExists: any;
}

const initialState: LoginState = {
    loading: false,
    error: null,
    user:null,
    confirmationResult: null,
    signupAlert: false,
    mobileCheckLoading: false,
    mobileExists: null
};

const loginReducer = (state = initialState, action: LoginActionTypes): LoginState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, confirmationResult: action.payload.confirmationResult };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        case SIGNUP_ALERT:
            return { ...state, signupAlert: true };
        case SIGNUP_ALERT_CLOSE:
            return { ...state, signupAlert: false };
        case CHECK_MOBILE_REQUEST:
            return { ...state, mobileCheckLoading: true, mobileExists: null };
        case CHECK_MOBILE_SUCCESS:
            return { ...state, mobileCheckLoading: false, mobileExists: action.payload.exists };
        case CHECK_MOBILE_FAILURE:
            return { ...state, mobileCheckLoading: false, error: action.payload.error };
        default:
            return state
    }
};

export default loginReducer;
