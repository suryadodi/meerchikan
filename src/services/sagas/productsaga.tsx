import { call, put, takeLatest, fork } from "redux-saga/effects";
import {
  productRequest,
  productFailureAction,
  ProductRequestAction,
  productSuccessAction,
  setTotalPagesAction,
  productDetailRequest,
  ProductDetailRequestAction,
  productDetailSuccessAction,
  productDetailFailureAction,
} from "../action/productAction";
import client from "../../../src/apolloClient"; // Adjust path as needed
import { GET_ONE_PRODUCT, GET_PRODUCT } from "@/helpers/query";
import { fetchCartItems } from "@/components/utils/fetchCartItems";
import { initialCartRequest } from "../action/cartAction";

function* fetchProductsSaga(action: ProductRequestAction) {
  try {
    const { page = 1, itemsPerPage, id } = action.payload || {};
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
      query: GET_PRODUCT,
      variables: { offset, limit: itemsPerPage },
    });

    const totalProducts = data.mst_product_aggregate.aggregate.count>itemsPerPage?data.mst_product_aggregate.aggregate.count:itemsPerPage;

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const payload = {
      product: data.mst_product,
      cart: cartData,
      currentPage: validPage,
      totalPage: totalPages,
      id
    };
    yield put(productSuccessAction(payload));
    // yield put(setTotalPagesAction(totalPages));
  } catch (error) {
    if (error instanceof Error) {
      yield put(productFailureAction(error.message));
    } else {
      yield put(productFailureAction("An unknown error occurred"));
    }
  }
}
function* fetchProductDetailSaga(action: ProductDetailRequestAction) {
  try{
    console.log("working",action.payload);
    const{id,user_id}=action.payload;
   
    const { data } = yield call([client, client.query], {
      query: GET_ONE_PRODUCT,
      variables: { id}

    });

    yield put(productDetailSuccessAction(data.mst_product[0]))
    if (user_id) {
      yield put(initialCartRequest(user_id))
     }
  }
  catch(error: any){
    yield put(productDetailFailureAction(error.message));

  }
}

function* product() {
  yield takeLatest(productRequest, fetchProductsSaga);
  yield takeLatest(productDetailRequest, fetchProductDetailSaga);

}

export const productSaga = [fork(product)];
