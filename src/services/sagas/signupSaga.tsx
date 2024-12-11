import { call, put, takeEvery, all, CallEffect, PutEffect, fork, takeLatest } from 'redux-saga/effects';
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { CHECK_MOBILE } from '@/helpers/query';
import client from '@/apolloClient';
import { auth } from '@/components/config/firebase_config';
import { 
  SIGNUP_REQUEST, 
  CHECK_MOBILE_REQUEST, 
  checkMobileSuccess, 
  checkMobileFailure, 
  signupSuccess,
  signupFailure,
  loginAlert,
} from '../action/signupAction';
import { CREATE_USER } from '@/helpers/mutation';

interface CheckMobileAction {
  type: typeof CHECK_MOBILE_REQUEST;
  payload: { 
    mobile: string,
    name: string; 
    email: string; 
  };
}

// function* otpSend(mobile: string, appVerifier: RecaptchaVerifier): Generator {
//   try {
//     const confirmationResult: ConfirmationResult | unknown = yield call(() =>
//       signInWithPhoneNumber(auth, `+91${mobile}`, appVerifier)
//     );
//     const user = auth.currentUser;
//     yield put(signupSuccess(user, confirmationResult));
//   } catch (error: any) {
//     yield put(signupFailure(error.message));
//   }
// }

function* createUser(name: string, email: string, mobile: string): Generator {
  try {
    const { data }: any = yield call(() =>
      client.mutate({
        mutation: CREATE_USER,
        variables: { name, email, mobile, user_type: 'user' },
      })
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

function* checkMobile(action: CheckMobileAction): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { name, email, mobile } = action.payload;
  
  try {
    const { data } = yield call(() =>
      client.query({
        query: CHECK_MOBILE,
        variables: { mobile: mobile },
      })
    );

    const exists = data && data.mst_users && data.mst_users.length > 0;
    yield put(checkMobileSuccess(exists));

    if (exists) {
      yield put(loginAlert());
    } else {
      yield call(createUser, name, email, mobile);
    }
  } catch (error: any) {
    yield put(checkMobileFailure(error.message));
    // yield put(signupFailure(error.message));
  }
}

function* signup() {
  yield all([
    // takeEvery(SIGNUP_REQUEST, checkMobile),
    takeLatest(CHECK_MOBILE_REQUEST, checkMobile),
  ]);
}

export const signupSaga = [fork(signup)];
