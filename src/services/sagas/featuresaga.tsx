import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  featureRequest,
  featureFailureAction,
  FeatureRequestAction,
  featureSuccessAction,
} from "../action/featureAction";
import client from "../../../src/apolloClient"; // Adjust path as needed
import { GET_FEATURED } from "@/helpers/query";
import { fetchCartItems } from "@/components/utils/fetchCartItems";

function* fetchFeaturesSaga(action: FeatureRequestAction) {
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
      query: GET_FEATURED,
      variables: { offset: 0, limit: 3 },
    });

    const payload = {
      feature: data.mst_product,
      cart: cartData,
      id
    };

    yield put(featureSuccessAction(payload));
  } catch (error) {
    if (error instanceof Error) {
      yield put(featureFailureAction(error.message));
    } else {
      yield put(featureFailureAction("An unknown error occurred"));
    }
  }
}

function* feature() {
  yield takeLatest(featureRequest, fetchFeaturesSaga);
}

export const featureSaga = [fork(feature)];
