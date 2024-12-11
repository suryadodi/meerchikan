import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { sellerRequest, sellerFailureAction, SellerRequestAction, sellerSuccessAction } from '../action/sellerAction';
import client from '../../../src/apolloClient'; // Adjust path as needed
import {  GET_BESTSELLER, GET_FEATURED } from '@/helpers/query';
import { fetchCartItems } from '@/components/utils/fetchCartItems';

function* fetchSellersSaga(action: SellerRequestAction) {
  try {
    const{id}=action.payload
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
      query:GET_BESTSELLER ,
      variables: {offset: 0, limit: 3 },
    });

    const payload = {
      seller: data.mst_product,
      cart: cartData,
      id
    }
    
    yield put(sellerSuccessAction(payload));
  } catch (error) {
    if (error instanceof Error) {
      yield put(sellerFailureAction(error.message));
    } else {
      yield put(sellerFailureAction("An unknown error occurred"));
    }
  }
}

 function* seller() {
  yield takeLatest(sellerRequest, fetchSellersSaga);
}




export const sellerSaga = [fork(seller)];