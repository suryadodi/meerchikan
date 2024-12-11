import {
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import client from "@/apolloClient";
import {
  ADD_CART,
  INCREASE_QUANTITY,
  REMOVE_ITEM,
  UPDATE_CART,
} from "@/helpers/mutation";
import {
  CartActions,
  initialCartSuccess,
  decreaseItemQuantity,
  increaseItemQuantity,
  initialCartRequest,
  removeItemFromCart,
  addToCartSuccess,
  addToCartRequest,
  addToCartUpdate,
  cartTotal,
  removeItemCart,
} from "../action/cartAction";
import {
  categoryProductDecreaseAction,
  categoryProductIncreaseAction,
  subCategoryProductDecreaseAction,
  subCategoryProductIncreaseAction,
  productDecreaseAction,
  productIncreaseAction,
  productRemoveAction,
  categoryProductRemoveAction,
  subCategoryProductRemoveAction,
  productUpdateAction,
  categoryProductUpdateAction,
  subCategoryProductUpdateAction,
} from "../action/productAction";
import { fetchCartItems } from "@/components/utils/fetchCartItems";
import {
  featureDecreaseAction,
  featureIncreaseAction,
  featureRemoveAction,
  featureUpdateAction,
} from "../action/featureAction";
import {
  sellerDecreaseAction,
  sellerIncreaseAction,
  sellerRemoveAction,
  sellerUpdateAction,
} from "../action/sellerAction";
import { CHECK_PRODUCT_QUERY, GET_CART_ITEMS } from "@/helpers/query";
import { SagaIterator } from "redux-saga";
import { trendingDecreaseAction, trendingIncreaseAction, trendingRemoveAction, trendingUpdateAction } from "../action/trendingAction";

function* initialCartSaga(action: ReturnType<typeof initialCartRequest>) {
  try {
    const { id } = action.payload;
    const { datas, error } = yield call(fetchCartItems, id);

    if (error) {
      console.log(error);
      return;
    }

    if (datas && datas.mst_cart) {
      yield put(initialCartSuccess(datas.mst_cart));
    }
  } catch (error) {
    console.log((error as Error).message);
  }
}

function* addToCartSaga(
  action: ReturnType<
    | typeof addToCartRequest
    | typeof productIncreaseAction
    | typeof categoryProductIncreaseAction
    | typeof subCategoryProductIncreaseAction
    | typeof trendingIncreaseAction
    | typeof featureIncreaseAction
    | typeof sellerIncreaseAction
  >
):Generator {
  yield put(productIncreaseAction(action.payload));
  yield put(featureIncreaseAction(action.payload));
  yield put(sellerIncreaseAction(action.payload));
  yield put(trendingIncreaseAction(action.payload));
  yield put(categoryProductIncreaseAction(action.payload));
  yield put(subCategoryProductIncreaseAction(action.payload));
  try {
    const {
      id,
      image,
      name,
      selectedQuantity,
      selectedPrice,
      quantity,
      user_id,
      offered_price,
      selling_price ,
      price
    } = action.payload;

 
    
    if (user_id) {
      // Perform GraphQL mutation
      const { data }: any = yield call(() =>
        client.mutate({
          mutation: ADD_CART,
          variables: {
            product_id: id,
            product_name: name,
            price: quantity*offered_price,
            user_id,
            saved_price:selling_price-offered_price,
            image,
            quantity, 
            offered_price,
            selling_price,
            attributes: {
              prices:{
              selectedQuantity,
              }
            },
          },
        })
      );
      if(data.insert_mst_cart.returning[0]){
      yield put(addToCartSuccess(data.insert_mst_cart.returning[0]));
      yield put(initialCartRequest(user_id));   

    }
    }
     else {
      const values: any =  {
        product_id: id,
        product_name: name,
        price: quantity*offered_price,
        user_id,
        image,
        quantity,
        offered_price,
        selling_price,
        saved_price:quantity*(selling_price-offered_price),
        attributes: {
          prices:{
          selectedQuantity,
          }
        },
      };
      yield put(addToCartSuccess(values));
      // yield put(initialCartSuccess(values));
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "An unexpected error occurred";
    console.log(errorMessage);
  }
}

function* addCartUpdateSaga(action: ReturnType<typeof addToCartUpdate>):Generator {
  try {
    const {
      id,
      image,
      name,
      selectedQuantity,
      original_price,
      selectedPrice,
      offered_price,
      selling_price ,
      quantity,
      user_id,
      price
    } = action.payload;

    if (user_id) {
      const { data }:any = yield call([client, client.query], {
        query: CHECK_PRODUCT_QUERY,
        variables: { product_id: id, user_id },
        fetchPolicy: "network-only",
      }) as any;

      if (data?.mst_cart?.length > 0) {
     const{data}:any= yield call([client, client.mutate], {
          mutation: UPDATE_CART,
          variables: {
            product_id: id,
            price:quantity*offered_price,
            saved_price:quantity*(selling_price-offered_price),
            offered_price,
            user_id,
            quantity,
          },
        });
        console.log(data,"datareturn");
        
         if(data?.update_mst_cart?.returning){
        yield put(productUpdateAction(data?.update_mst_cart?.returning))
        yield put(categoryProductUpdateAction(data?.update_mst_cart?.returning))
        yield put(subCategoryProductUpdateAction(data?.update_mst_cart?.returning))
        yield put(featureUpdateAction(data?.update_mst_cart?.returning))
        yield put(sellerUpdateAction(data?.update_mst_cart?.returning))
        yield put(trendingUpdateAction(data?.update_mst_cart?.returning))
         }
      } else {
        yield call([client, client.mutate], {
          mutation: ADD_CART,
          variables: {
            product_id: id,
            product_name: name,
            price: quantity*offered_price,
            user_id,
            saved_price:quantity*(selling_price-offered_price),
            image,
            quantity, 
            offered_price,
            selling_price,
            attributes: {
              prices:{
              selectedQuantity,
              }
            },
          },
        });
        yield put(initialCartRequest(user_id))
        
      }

    }
  } catch (error) {
    console.error(error);
  }
}

function* increaseQuantitySaga(
  action: ReturnType<typeof increaseItemQuantity>
): SagaIterator {
  yield put(productIncreaseAction(action.payload));
  yield put(featureIncreaseAction(action.payload));
  yield put(sellerIncreaseAction(action.payload));
  yield put(sellerIncreaseAction(action.payload));
  yield put(trendingIncreaseAction(action.payload));
  yield put(categoryProductIncreaseAction(action.payload));
  yield put(subCategoryProductIncreaseAction(action.payload));
  
  const { id, user_id, selling_price,offered_price } = action.payload;
  console.log(selling_price,"selling");
  
  if (user_id) {
    try {
      yield call(client.mutate, {
        mutation: INCREASE_QUANTITY,
        variables: { user_id, product_id: id, quantity: 1, price:offered_price,saved_price:(selling_price-offered_price) },
      });
    } catch (error) {
      console.log(error);
    }
    
    // const { datas, error } = yield call(fetchCartItems, user_id);

    // if (error) {
    //   console.log(error);
    //   return;
    // }
    // yield put(cartTotal(datas.mst_cart));
  }
}

function* decreaseQuantitySaga(
  action: ReturnType<typeof decreaseItemQuantity>
) {
  yield put(productDecreaseAction(action.payload));
  yield put(featureDecreaseAction(action.payload));
  yield put(sellerDecreaseAction(action.payload));
  yield put(categoryProductDecreaseAction(action.payload));
  yield put(subCategoryProductDecreaseAction(action.payload));
  yield put(trendingDecreaseAction(action.payload));

  const { id, user_id, val,selling_price,offered_price } = action.payload;
  if (user_id) {
    try {
      if (val > 1) {
        yield call(client.mutate, {
          mutation: INCREASE_QUANTITY,
          variables: { user_id, product_id: id, quantity: -1, price: -offered_price,saved_price:-(selling_price-offered_price) },
        });
      } else {
        yield call(client.mutate, {
          mutation: REMOVE_ITEM,
          variables: { user_id, product_id: id },
        });
      }
    } catch (error) {
      console.log(error);
    }

    // const { datas, error } = yield call(fetchCartItems, user_id);

    // if (error) {
    //   console.log(error);
    //   return;
    // }
    // yield put(cartTotal(datas.mst_cart));
  }
}

function* removeCartSaga(action: ReturnType<typeof removeItemFromCart>):Generator {
  yield put(productRemoveAction(action.payload));
  yield put(featureRemoveAction(action.payload));
  yield put(sellerRemoveAction(action.payload));
  yield put(categoryProductRemoveAction(action.payload));
  yield put(subCategoryProductRemoveAction(action.payload));
  yield put (trendingRemoveAction(action.payload));
  const { id, user_id } = action.payload;
  if (user_id) {
    try {
     const response:any= yield call(client.mutate, {
        mutation: REMOVE_ITEM,
        variables: { user_id: user_id, product_id: id },
      });
    if(response.data){
      yield put(removeItemCart(id,user_id));

    }
    } catch (error) {
      console.log(error);
    }

    // const { datas, error } = yield call(fetchCartItems, user_id);

    // if (error) {
    //   console.log(error);
    //   return;
    // }
    // // yield put(cartTotal(datas.mst_cart));
  }
  else{
    yield put(removeItemCart(id,user_id));
  }
}

function* increase() {
  yield takeLatest(CartActions.INCREASE_ITEM_QUANTITY, increaseQuantitySaga);
}

function* decrease() {
  yield takeLatest(CartActions.DECREASE_ITEM_QUANTITY, decreaseQuantitySaga);
}

function* removeCart() {
  yield takeLatest(CartActions.REMOVE_ITEM_FROM_CART, removeCartSaga);
}

function* addCart() {
  yield takeLatest(CartActions.ADD_TO_CART_REQUEST, addToCartSaga);
}

function* intialCart() {
  yield takeLatest(CartActions.INITIAL_CART_REQUEST, initialCartSaga);
}

function* addCartUpdate() {
  yield takeEvery(CartActions.ADD_TO_CART_UPDATE, addCartUpdateSaga);
}

export const addCartSaga = [
  fork(addCart),
  fork(increase),
  fork(decrease),
  fork(removeCart),
  fork(intialCart),
  fork(addCartUpdate),
];
