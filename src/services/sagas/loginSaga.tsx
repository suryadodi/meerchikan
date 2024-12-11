import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginFailure, loginSuccess, signupAlert, CHECK_MOBILE_REQUEST, checkMobileSuccess, checkMobileFailure, CheckMobileRequestAction } from '../action/loginAction';
import client from '@/apolloClient';
import { CHECK_MOBILE } from '@/helpers/query';


function* checkMobile(action:CheckMobileRequestAction ): Generator<any, void, any> {
    const { mobileNumber } = action.payload;
    
    try {
        const { data } = yield call(() =>
            client.query({
                query: CHECK_MOBILE,
                variables: { mobile: mobileNumber },
            })
        );      
        const exists = data && data.mst_users[0];        
        yield put(checkMobileSuccess(exists));

        if (!exists) {
            yield put(signupAlert());
        } 
       
    } catch (error: any) {
        yield put(checkMobileFailure(error.message));
        yield put(loginFailure(error.message));
    }
}

function* login() {
    yield all([
        // takeEvery(LOGIN_REQUEST, checkMobile),
        takeLatest(CHECK_MOBILE_REQUEST, checkMobile),
    ]);
}

export const loginSaga = [fork(login)];
