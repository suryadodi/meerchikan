// sagas/subCategorySagas.ts
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  subCategoryFailureAction,
  subCategoryRequest,
  SubCategoryRequestAction,
  subCategorySuccessAction,
} from "../action/subCategoryAction";
import client from "../../../src/apolloClient";
import { GET_SUB } from "@/helpers/query";

function* fetchSubCategorysSaga(action: SubCategoryRequestAction) {
  try {
    const { data } = yield call([client, client.query], {
      query: GET_SUB,
    });

    yield put(subCategorySuccessAction(data.mst_sub_category));
  } catch (error) {
    if (error instanceof Error) {
      yield put(subCategoryFailureAction(error.message));
    } else {
      yield put(subCategoryFailureAction("An unknown error occurred"));
    }
  }
}

function* subCategory() {
  yield takeLatest(subCategoryRequest, fetchSubCategorysSaga);
}
export const subCategorySaga = [fork(subCategory)];
