import { ConfirmationResult } from "firebase/auth";
import { SignupActionTypes, 
    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAILURE, 
    CHECK_MOBILE_REQUEST, 
    CHECK_MOBILE_SUCCESS, 
    CHECK_MOBILE_FAILURE,
    loginAlert,
    LOGIN_ALERT,
    LOGIN_ALERT_CLOSE,
} from "../action/signupAction";

interface SignupState {
    loading: boolean;
    user: any;
    error: string | null;
    mobileChecking: boolean;
    loginAlert: boolean; 
    mobileExists: boolean | null;
    confirmationResult: ConfirmationResult | null; 
    
}

const initialState: SignupState = {
    loading: false,
    user: null,
    error: null,
    mobileChecking: false,
    confirmationResult: null,
    loginAlert:false,
    mobileExists: null,
};

const signupReducer = (state = initialState, action: SignupActionTypes): SignupState => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return { ...state, loading: true, error: null };
        case SIGNUP_SUCCESS:
            return { ...state, loading: false, user: action.payload, confirmationResult: action.payload.confirmationResult, error: null };
        case SIGNUP_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        case CHECK_MOBILE_REQUEST:
            return { ...state, mobileChecking: true, mobileExists: null, error: null };
        case CHECK_MOBILE_SUCCESS:
            return { ...state, mobileChecking: false, mobileExists: action.payload.exists };
        case CHECK_MOBILE_FAILURE:
            return { ...state, mobileChecking: false, error: action.payload.error };
        case LOGIN_ALERT:
            return { ...state, loginAlert: true }; 
        case LOGIN_ALERT_CLOSE:
            return { ...state, loginAlert: false };
        default:
            return state;
    }
};

export default signupReducer;
