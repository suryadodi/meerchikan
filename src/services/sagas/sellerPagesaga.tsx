import { call, put, takeLatest, fork } from "redux-saga/effects";
import {
  sellerPageRequest,
  sellerPageFailureAction,
  SellerPageRequestAction,
  setTotalPagesAction,
  sellerPageSuccessAction,
} from "../action/productAction";
import client from "../../apolloClient"; // Adjust path as needed
import { GET_BESTSELLER, GET_PRODUCT } from "@/helpers/query";

function* fetchSellerPagesSaga(action: SellerPageRequestAction) {
  try {
    const { page = 1, itemsPerPage } = action.payload || {};

    const validPage = Math.max(page, 1);

    const offset = (validPage - 1) * itemsPerPage;

    const { data } = yield call([client, client.query], {
      query: GET_BESTSELLER,
      variables: { offset, limit: itemsPerPage },
    });


    const totalProducts = data.mst_product_aggregate.aggregate.count;

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const payload = {
      seller: data.mst_product,
      currentPage: validPage,
      totalPage: totalPages,
    };

    yield put(sellerPageSuccessAction(payload));
    yield put(setTotalPagesAction(totalPages));
  } catch (error) {
    if (error instanceof Error) {
      yield put(sellerPageFailureAction(error.message));
    } else {
      yield put(sellerPageFailureAction("An unknown error occurred"));
    }
  }
}

function* sellerPage() {
  yield takeLatest(sellerPageRequest, fetchSellerPagesSaga);
}

export const sellerPageSaga = [fork(sellerPage)];
