import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  sortRequest,
  sortFailureAction,
  SortRequestAction,
  sortSuccessAction,
  sortLowSuccessAction,
  sortLowFailureAction,
  sortLowRequest,
  SortLowRequestAction,
} from "../action/productAction";
import client from "../../../src/apolloClient"; // Adjust path as needed
import { GET_HIGH_TO_LOW } from "@/helpers/query";
import { setTotalPagesAction } from "../action/productAction";

function* fetchSortsSaga(action: SortRequestAction) {
  try {
    const { page = 1, itemsPerPage } = action.payload || {};

    const validPage = Math.max(page, 1);

    const offset = (validPage - 1) * itemsPerPage;

    const { data } = yield call([client, client.query], {
      query: GET_HIGH_TO_LOW,
      variables: { offset, limit: itemsPerPage, priceOrder: "desc" },
    });

    console.log(data, "sorsagadata");
    const totalProducts = data.mst_product_aggregate.aggregate.count;
    console.log(totalProducts, "totalProducts");

    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    console.log(totalPages, "totalPagesproduct");

    const payload = {
      sort: data.mst_product,
      currentPage: validPage,
      totalPage: totalPages,
    };
    yield put(sortSuccessAction(payload));
    yield put(setTotalPagesAction(totalPages));
  } catch (error) {
    if (error instanceof Error) {
      yield put(sortFailureAction(error.message));
    } else {
      yield put(sortFailureAction("An unknown error occurred"));
    }
  }
}

function* sort() {
  yield takeLatest(sortRequest, fetchSortsSaga);
}

function* fetchSortsLowSaga(action: SortLowRequestAction) {
  try {
    const { page = 1, itemsPerPage } = action.payload || {};

    const validPage = Math.max(page, 1);

    const offset = (validPage - 1) * itemsPerPage;

    const { data } = yield call([client, client.query], {
      query: GET_HIGH_TO_LOW,
      variables: { offset, limit: itemsPerPage, priceOrder: "asc" },
    });

    console.log(data, "sorsagadatasc");
    const totalProducts = data.mst_product_aggregate.aggregate.count;
    console.log(totalProducts, "totalProducts");

    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    console.log(totalPages, "totalPagesproduct");

    const payload = {
      sort: data.mst_product,
      currentPage: validPage,
      totalPage: totalPages,
    };
    yield put(sortLowSuccessAction(payload));
    yield put(setTotalPagesAction(totalPages));
  } catch (error) {
    if (error instanceof Error) {
      yield put(sortLowFailureAction(error.message));
    } else {
      yield put(sortLowFailureAction("An unknown error occurred"));
    }
  }
}

function* sortLow() {
  yield takeLatest(sortLowRequest, fetchSortsLowSaga);
}

export const sortSaga = [fork(sort), fork(sortLow)];
