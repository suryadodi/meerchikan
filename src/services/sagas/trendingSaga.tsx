import { call, put, takeLatest, all, fork } from "redux-saga/effects";

import client from "../../../src/apolloClient"; // Adjust path as needed
import { GET_TRENDING } from "@/helpers/query";
import { fetchCartItems } from "@/components/utils/fetchCartItems";
import { trendingFailureAction, trendingRequest, TrendingRequestAction, trendingSuccessAction } from "../action/trendingAction";

function* fetchTrendingSaga(action: TrendingRequestAction) {
  try {
    const { id } = action.payload;
    let cartData = [];
    if (id) {
      const { datas, error } = yield call(fetchCartItems, id);
      if (error) {
        console.log(error);
        return;
      }
      cartData = datas?.mst_cart || [];
    }
    const { data } = yield call([client, client.query], {
      query: GET_TRENDING,
      variables: { offset: 0, limit: 3 },
    });
    console.log(data,"data in trendingSaga")

    const payload = {
      trending: data.mst_product,
      cart: cartData,
      id
    };
console.log(payload,"payloadcartdata")
    yield put(trendingSuccessAction(payload));
  } catch (error) {
    if (error instanceof Error) {
      yield put(trendingFailureAction(error.message));
    } else {
      yield put(trendingFailureAction("An unknown error occurred"));
    }
  }
}

function* trending() {
  yield takeLatest(trendingRequest, fetchTrendingSaga);
}

export const trendingSaga = [fork(trending)];
