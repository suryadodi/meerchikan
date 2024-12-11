import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { ConfirmationResult } from 'firebase/auth';
import { CREATE_USER } from '@/helpers/mutation';
import {
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  verifyOtpSuccess,
  verifyOtpFailure,
  createUserSuccess,
  createUserFailure,
  createUserRequest
} from '@/services/action/otpAction';
import client from '@/apolloClient';

// Action interface definitions
interface VerifyOtpAction {
  type: typeof VERIFY_OTP_REQUEST;
  payload: {
    otp: string;
    confirmationResult: ConfirmationResult;
    userDetails: {
      name: string;
      email: string;
      mobile: string;
    };
  };
}

interface CreateUserAction {
  type: typeof CREATE_USER_REQUEST;
  payload: {
    name: string;
    email: string;
    mobile: string;
  };
}

function* verifyOtp(action: VerifyOtpAction) {
  try {
    const { otp, confirmationResult, userDetails } = action.payload;
    yield call(() => confirmationResult.confirm(otp));
 
    yield put(verifyOtpSuccess());
    const { name, email, mobile } = userDetails;    
    yield put(createUserRequest(name,email,mobile));
  } catch (error: any) {
    yield put(verifyOtpFailure(error.message));
  }
}

function* createUser(action: CreateUserAction) {
  try {
    const { name, email, mobile } = action.payload;
    yield call(() =>
      client.mutate({
        mutation: CREATE_USER,
        variables: { name, email, mobile, user_type: 'user' },
      })
    );

    // localStorage.setItem('accessToken', 'dummy-access-token'  ); 
    yield put(createUserSuccess());
  } catch (error: any) {
    yield put(createUserFailure(error.message));
  }
}



function* otp() {
  yield all([
     takeEvery(VERIFY_OTP_REQUEST, verifyOtp),
     takeEvery(CREATE_USER_REQUEST, createUser),
  ]);
}

export const otpSaga = [fork(otp)];
