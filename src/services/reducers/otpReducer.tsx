
import { VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE } from '@/services/action/otpAction';

interface OtpState {
  status: 'idle' | 'pending' | 'success' | 'failure';
  error: string | null;
}

const initialState: OtpState = {
  status: 'idle',
  error: null,
};

const otpReducer = (state = initialState, action: any): OtpState => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        status: 'pending',
        error: null,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        status: 'success',
        error: null,
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        status: 'failure',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default otpReducer;
