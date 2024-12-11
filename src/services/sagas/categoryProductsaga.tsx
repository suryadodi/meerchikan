import { call, put, takeLatest, fork } from "redux-saga/effects";
import client from "../../apolloClient"; // Adjust path as needed
import { GET_CATEGORY_PRODUCT } from "@/helpers/query";
import {
  categoryProductFailureAction,
  categoryProductRequest,
  categoryProductSuccessAction,
  CategoryProductRequestAction,
} from "../action/productAction";
import { fetchCartItems } from "@/components/utils/fetchCartItems";
import { categoryIdAction } from "../action/cartAction";

function* fetchCategoryProductsSaga(action: CategoryProductRequestAction) {
  try {
    const { page = 1, itemsPerPage, categoryId, id } = action.payload || {};
    let cartData = [];
    if (id) {
      const { datas, error } = yield call(fetchCartItems, id);
      if (error) {
        console.log(error);
        return;
      }
      cartData = datas?.mst_cart || [];
    }
    const validPage = Math.max(page, 1);
    const offset = (validPage - 1) * itemsPerPage;

    const { data } = yield call([client, client.query], {
      query: GET_CATEGORY_PRODUCT,
      variables: { offset, limit: itemsPerPage, categoryId },
    });
    const totalProducts = data.mst_product_aggregate.aggregate.count>itemsPerPage?data.mst_product_aggregate.aggregate.count:itemsPerPage;

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const payload = {
      categoryProduct: data.mst_product,
      currentPage: validPage,
      totalPage: totalPages,
      cart: cartData,
    };

    yield put(categoryProductSuccessAction(payload));
    yield put(categoryIdAction(null));

  } catch (error) {
    if (error instanceof Error) {
      yield put(categoryProductFailureAction(error.message));
    } else {
      yield put(categoryProductFailureAction("An unknown error occurred"));
    }
  }
}

function* watchCategoryProducts() {
  yield takeLatest(categoryProductRequest, fetchCategoryProductsSaga);
}

export const categoryProductSaga = [fork(watchCategoryProducts)];
