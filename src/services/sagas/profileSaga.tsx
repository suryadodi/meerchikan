import { call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_USER_REQUEST,
  fetchUserSuccess,
  fetchUserFailure,
  UPDATE_USER_REQUEST,
  updateUserSuccess,
  updateUserFailure,
} from '@/services/action/profileAction';
import client from '@/apolloClient';
import { GET_USER_BY_ID } from '@/helpers/query';
import { UPDATE_USER } from '@/helpers/mutation';

function* fetchUser(action: any) {
  try {
    const { id } = action.payload;
    const { data } = yield call(() =>
      client.query({
        query: GET_USER_BY_ID,
        variables: { id },
      })
    );
    yield put(fetchUserSuccess(data.mst_users[0]));
  } catch (error: any) {
    yield put(fetchUserFailure(error.message));
  }
}

function* updateUser(action: any) {
  try {
    const { id, userDetails } = action.payload;
    yield call(() =>
      client.mutate({
        mutation: UPDATE_USER,
        variables: { id, ...userDetails },
        refetchQueries: [
          { query: GET_USER_BY_ID, variables: { user: action.payload.user } }
        ]
      })
    );
    yield put(updateUserSuccess(userDetails));
  } catch (error: any) {
    yield put(updateUserFailure(error.message));
  }
}

 function* user() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUser);
  yield takeEvery(UPDATE_USER_REQUEST, updateUser);
}

export const userSaga = [fork(user)]