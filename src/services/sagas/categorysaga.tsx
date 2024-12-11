// sagas/bannerSagas.ts
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  categoryRequest,
  categorySuccessAction,
  categoryFailureAction,
  CategoryRequestAction,
} from "../action/productAction";
import client from "../../../src/apolloClient"; // Adjust path as needed
import { gql } from "@apollo/client";
import { GET_CATEGORY } from "@/helpers/query";

function* fetchCategorysSaga() {
  try {
    const { data } = yield call([client, client.query], {
      query: GET_CATEGORY,
    });

    yield put(categorySuccessAction(data.mst_category));
  } catch (error) {
    if (error instanceof Error) {
      yield put(categoryFailureAction(error.message));
    } else {
      yield put(categoryFailureAction("An unknown error occurred"));
    }
  }
}

function* category() {
  yield takeLatest(categoryRequest, fetchCategorysSaga);
}

export const categorySaga = [fork(category)];
