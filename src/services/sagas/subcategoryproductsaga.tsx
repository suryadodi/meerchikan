
import { call, put, takeLatest,  fork } from 'redux-saga/effects';
import client from '../../../src/apolloClient'; // Adjust path as needed
import { GET_SUBCATEGORY_PRODUCT } from '@/helpers/query';
import { subCategoryProductFailureAction, subCategoryProductRequest, subCategoryProductSuccessAction, SubCategoryProductRequestAction } from '../action/productAction';
import { fetchCartItems } from '@/components/utils/fetchCartItems';

function* fetchSubCategoryProductsSaga(action: SubCategoryProductRequestAction) {
  
  try {
    const { page = 1, itemsPerPage, subCategoryId,id } = action.payload || {};
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
      query: GET_SUBCATEGORY_PRODUCT,
      variables: { offset, limit: itemsPerPage, sub_categoryId:subCategoryId }, // Use the correct offset and limit
    });


    const totalProducts = data.mst_product_aggregate.aggregate.count>itemsPerPage?data.mst_product_aggregate.aggregate.count:itemsPerPage;
    
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const payload = {
      subCategoryProduct: data.mst_product, 
      currentPage: validPage,
      totalPage: totalPages,
      cart:cartData
    };
    
    yield put(subCategoryProductSuccessAction(payload));
  } catch (error) {
    if (error instanceof Error) {
      yield put(subCategoryProductFailureAction(error.message));
    } else {
      yield put(subCategoryProductFailureAction("An unknown error occurred"));
    }
  }
}


function* watchSubCategoryProducts() {
  yield takeLatest(subCategoryProductRequest, fetchSubCategoryProductsSaga);
}

export const subCategoryProductSaga = [fork(watchSubCategoryProducts)];





