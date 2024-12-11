// sagas/bannerSagas.ts
import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { bannerRequest, bannerSuccessAction, bannerFailureAction, BannerRequestAction, } from '../action/bannerAction';
import client from "../../../src/apolloClient" ; // Adjust path as needed
import { gql } from '@apollo/client';
import { GET_BANNER } from '@/helpers/query';

function* fetchBannersSaga(action: BannerRequestAction) {
  try {
    const { data } = yield call([client, client.query], { query: GET_BANNER });
    
    yield put(bannerSuccessAction(data.mst_banner));
  } catch (error) {
    if (error instanceof Error) {
      yield put(bannerFailureAction(error.message));
    } else {
      yield put(bannerFailureAction("An unknown error occurred"));
    }
  }
}

  function* banner() {
  yield takeLatest(bannerRequest, fetchBannersSaga);
}
export const bannerSaga = [fork(banner)];


