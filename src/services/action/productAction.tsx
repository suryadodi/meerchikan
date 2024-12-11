export const productSuccess = "PRODUCT_SUCCESS";
export const productUpdate = "PRODUCT_UPDATE";
export const productRequest = "PRODUCT_REQUEST";
export const productFailure = "PRODUCT_FAILURE";
export const productIncrease = "PRODUCT_INCREASE";
export const productDecrease = "PRODUCT_DECREASE";
export const productRemove = "PRODUCT_REMOVE";
export const categorySuccess = "CATEGORY_SUCCESS";
export const categoryRequest = "CATEGORY_REQUEST";
export const categoryFailure = "CATEGORY_FAILURE";
export const categoryProductUpdate = "CATEGORY_PRODUCT_UPDATE";
export const categoryProductIncrease = "CATEGORY_INCREASE";
export const categoryProductDecrease = "CATEGORY_DECREASE";
export const categoryProductRemove = "CATEGORY_PRODUCT_REMOVE";
export const categoryProductSuccess = "CATEGORY_PRODUCT_SUCCESS";
export const categoryProductRequest = "CATEGORY_PRODUCT_REQUEST";
export const categoryProductFailure = "CATEGORY_PRODUCT_FAILURE";
export const subCategoryProductUpdate = "SUB_CATEGORY_PRODUCT_UPDATE";
export const subCategoryProductSuccess = "SUB_CATEGORY_PRODUCT_SUCCESS";
export const subCategoryProductRequest = "SUB_CATEGORY_PRODUCT_REQUEST";
export const subCategoryProductFailure = "SUB_CATEGORY_PRODUCT_FAILURE";
export const subCategoryProductIncrease = "SUB_CATEGORY_PRODUCT_INCREASE";
export const subCategoryProductDecrease = "SUB_CATEGORY_PRODUCT_DECREASE";
export const subCategoryProductRemove = "SUB_CATEGORY_PRODUCT_REMOVE";
export const setPage = "SETPAGE";
export const setTotalPages = "SETTOTALPAGES";
export const sellerPageRequest = "SELLER_PAGE_REQUEST";
export const sellerPageSuccess = "SELLER_PAGE_SUCCESS";
export const sellerPageFailure = "SELLER_PAGE_FAILURE";
export const sortRequest = "SORT_REQUEST";
export const sortSuccess = "SORT_SUCCESS";
export const sortFailure = "SORT_FAILURE";
export const sortLowRequest = "LOW_SORT_REQUEST";
export const sortLowSuccess = "LOW_SORT_SUCCESS";
export const sortLowFailure = "LOW_SORT_FAILURE";
export const productDetailRequest = "PRODUCT_DETAIL_REQUEST";
export const productDetailSuccess = "PRODUCT_DETAIL_SUCCESS";
export const productDetailFailure = "PRODUCT_DETAIL_FAILURE";

export interface ProductRequestAction {
  type: typeof productRequest;
  payload: any;
}

interface ProductSuccessAction {
  type: typeof productSuccess;
  payload: any;
}
interface ProductUpdateAction {
  type: typeof productUpdate;
  payload: any;
}

interface ProductFailureAction {
  type: typeof productFailure;
  payload: any;
}

export interface ProductIncreaseAction {
  type: typeof productIncrease;
  payload: any;
}

export interface ProductDecreaseAction {
  type: typeof productDecrease;
  payload: any;
}

export interface ProductRemoveAction {
  type: typeof productRemove;
  payload: any;
}

export interface CategoryRequestAction {
  type: typeof categoryRequest;
  payload: any;
}

interface CategorySuccessAction {
  type: typeof categorySuccess;
  payload: any;
}

interface CategoryFailureAction {
  type: typeof categoryFailure;
  payload: any;
}
interface CategoryProductUpdateAction {
  type: typeof categoryProductUpdate;
  payload: any;
}
interface CategoryProductIncreaseAction {
  type: typeof categoryProductIncrease;
  payload: any;
}

interface CategoryProductDecreaseAction {
  type: typeof categoryProductDecrease;
  payload: any;
}

export interface CategoryProductRemoveAction {
  type: typeof categoryProductRemove;
  payload: any;
}

export interface CategoryProductRequestAction {
  type: typeof categoryProductRequest;
  payload: any;
}

interface CategoryProductSuccessAction {
  type: typeof categoryProductSuccess;
  payload: any;
}
interface CategoryProductFailureAction {
  type: typeof categoryProductFailure;
  payload: any;
}
export interface SubCategoryProductUpdateAction {
  type: typeof subCategoryProductUpdate;
  payload: any;
}
export interface SubCategoryProductRequestAction {
  type: typeof subCategoryProductRequest;
  payload: any;
}

interface SubCategoryProductSuccessAction {
  type: typeof subCategoryProductSuccess;
  payload: any;
}
interface SubCategoryProductFailureAction {
  type: typeof subCategoryProductFailure;
  payload: any;
}


interface SubCategoryProductIncreaseAction {
  type: typeof subCategoryProductIncrease;
  payload: any;
}

interface SubCategoryProductDecreaseAction {
  type: typeof subCategoryProductDecrease;
  payload: any;
}

export interface SubCategoryProductRemoveAction {
  type: typeof subCategoryProductRemove;
  payload: any;
}

export interface SellerPageRequestAction {
  type: typeof sellerPageRequest;
  payload: any;
}

interface SellerPageSuccessAction {
  type: typeof sellerPageSuccess;
  payload: any;
}
interface SellerPageFailureAction {
  type: typeof sellerPageFailure;
  payload: any;
}

interface SetPageAction {
  type: typeof setPage;
  payload: any;
}

interface SetTotalPagesAction {
  type: typeof setTotalPages;
  payload: any;
}
export interface SortRequestAction {
  type: typeof sortRequest;
  payload: any;
}

export interface SortSuccessAction {
  type: typeof sortSuccess;
  payload: any;
}

export interface SortFailureAction {
  type: typeof sortFailure;
  payload: any;
}

export interface SortLowRequestAction {
  type: typeof sortLowRequest;
  payload: any;
}

export interface SortLowSuccessAction {
  type: typeof sortLowSuccess;
  payload: any;
}

export interface SortLowFailureAction {
  type: typeof sortLowFailure;
  payload: any;
}
export interface ProductDetailRequestAction {
  type: typeof productDetailRequest;
  payload:any;
}
export interface ProductDetailSuccessAction {
  type: typeof productDetailSuccess;
  payload: any;
}
export interface ProductDetailFailureAction {
  type: typeof productDetailFailure;
  payload: any;
}

export type ProductActionTypes =
  | ProductRequestAction
  | ProductSuccessAction
  |ProductUpdateAction
  | ProductFailureAction
  | ProductIncreaseAction
  | ProductDecreaseAction
  | ProductRemoveAction
  | CategoryProductRequestAction
  | CategoryProductSuccessAction
  | CategoryProductFailureAction
  | SubCategoryProductRequestAction
  | SubCategoryProductSuccessAction
  | SubCategoryProductFailureAction
  | SetPageAction
  | SetTotalPagesAction
  | CategoryRequestAction
  | CategorySuccessAction
  | CategoryFailureAction
  |CategoryProductUpdateAction
  |SubCategoryProductUpdateAction
  | CategoryProductIncreaseAction
  | CategoryProductDecreaseAction
  | CategoryProductRemoveAction
  | SubCategoryProductRemoveAction
  | SubCategoryProductIncreaseAction
  | SubCategoryProductDecreaseAction
  | SellerPageRequestAction
  | SellerPageSuccessAction
  | SellerPageFailureAction
  | SortRequestAction
  | SortSuccessAction
  | SortFailureAction
  | SortLowRequestAction
  | SortLowSuccessAction
  | SortLowFailureAction
  |ProductDetailRequestAction
  |ProductDetailSuccessAction
  |ProductDetailFailureAction;

export const productRequestAction = (
  page: number|null,
  itemsPerPage: number|null,
  id: string
): ProductRequestAction => ({
  type: productRequest,
  payload: { page, itemsPerPage, id },
});

export const productSuccessAction = (products: any): ProductSuccessAction => ({
  type: productSuccess,
  payload: products,
});

export const productUpdateAction = (products: any): ProductUpdateAction => ({
  type: productUpdate,
  payload: products,
});

export const productFailureAction = (error: any): ProductFailureAction => ({
  type: productFailure,
  payload: error,
});

export const productIncreaseAction = (data: any): ProductIncreaseAction => {
  return {
    type: productIncrease,
    payload: data,
  };
};

export const productDecreaseAction = (data: any): ProductDecreaseAction => {
  return {
    type: productDecrease,
    payload: data,
  };
};

export const productRemoveAction = (data: any): ProductRemoveAction => {
  return {
    type: productRemove,
    payload: data,
  };
};
export const categoryRequestAction = (data: any): CategoryRequestAction => {
  return {
    type: categoryRequest,
    payload: data,
  };
};

export const categorySuccessAction = (
  categorys: any
): CategorySuccessAction => ({
  type: categorySuccess,
  payload: categorys,
});

export const categoryFailureAction = (error: any): CategoryFailureAction => ({
  type: categoryFailure,
  payload: error,
});

export const categoryProductIncreaseAction = (data: any): CategoryProductIncreaseAction => {
  return {
    type: categoryProductIncrease,
    payload: data,
  };
};

export const categoryProductDecreaseAction = (data: any): CategoryProductDecreaseAction => {
  return {
    type: categoryProductDecrease,
    payload: data,
  };
};

export const categoryProductRemoveAction = (data: any): ProductActionTypes => {
  return {
    type: categoryProductRemove,
    payload: data,
  };
}
export const categoryProductUpdateAction = (products: any): CategoryProductUpdateAction => ({
  type: categoryProductUpdate,
  payload: products,
});
export const categoryProductRequestAction = (
  categoryId: string,
  page: number,
  itemsPerPage: number,
  id:string
): CategoryProductRequestAction => {
  return {
    type: categoryProductRequest,
    payload: { page, itemsPerPage, categoryId,id },
  };
};

export const categoryProductSuccessAction = (
  categoryProductCategorys: any
): CategoryProductSuccessAction => {
  return {
    type: categoryProductSuccess,
    payload: categoryProductCategorys,
  };
};

export const categoryProductFailureAction = (error: any): CategoryProductFailureAction => {
  return {
    type: categoryProductFailure,
    payload: error,
  };
};
export const subCategoryProductUpdateAction = (products: any): SubCategoryProductUpdateAction => ({
  type: subCategoryProductUpdate,
  payload: products,
});
export const subCategoryProductRequestAction = (
  subCategoryId: string,
  page: number,
  itemsPerPage: number,
  id:string
): ProductActionTypes => {
  return {
    type: subCategoryProductRequest,
    payload: { page, itemsPerPage, subCategoryId,id },
  };
};

export const subCategoryProductSuccessAction = (
  subCategoryProductCategorys: any
): SubCategoryProductSuccessAction => {
  return {
    type: subCategoryProductSuccess,
    payload: subCategoryProductCategorys,
  };
};

export const subCategoryProductFailureAction = (error: any): ProductActionTypes => {
  return {
    type: subCategoryProductFailure,
    payload: error,
  };
};

export const subCategoryProductRemoveAction = (data: any): ProductActionTypes => {
  return {
    type: subCategoryProductRemove,
    payload: data,
  };
}

export const subCategoryProductIncreaseAction = (data: any): ProductActionTypes => {
  return {
    type: subCategoryProductIncrease,
    payload: data,
  };
};

export const subCategoryProductDecreaseAction = (data: any): ProductActionTypes => {
  return {
    type: subCategoryProductDecrease,
    payload: data,
  };
};

export const sellerPageRequestAction = (
  data: any,
  page: number,
  itemsPerPage: number
): SellerPageRequestAction => ({
  type: sellerPageRequest,
  payload: { page, itemsPerPage, data },
});

export const sellerPageSuccessAction = (
  sellersPage: any
): SellerPageSuccessAction => ({
  type: sellerPageSuccess,
  payload: sellersPage,
});

export const sellerPageFailureAction = (
  error: any
): SellerPageFailureAction => ({
  type: sellerPageFailure,
  payload: error,
});



export const setPageAction = (page: any): SetPageAction => ({
  type: setPage,
  payload: page,
});

export const setTotalPagesAction = (totalPages: any): SetTotalPagesAction => ({
  type: setTotalPages,
  payload: totalPages,
});

export const sortRequestAction = (
  data: any,
  page: number,
  itemsPerPage: number
): SortRequestAction => {
  return {
    type: sortRequest,
    payload: { page, itemsPerPage, data },
  };
};

export const sortSuccessAction = (sorts: any): SortSuccessAction => {
  return {
    type: sortSuccess,
    payload: sorts,
  };
};

export const sortFailureAction = (error: any): SortFailureAction => ({
  type: sortFailure,
  payload: error,
});

export const sortLowRequestAction = (
  data: any,
  page: number,
  itemsPerPage: number
): SortLowRequestAction => {
  return {
    type: sortLowRequest,
    payload: { page, itemsPerPage, data },
  };
};

export const sortLowSuccessAction = (sortLow: any): SortLowSuccessAction => {
  console.log(sortLow, "lowsort");
  return {
    type: sortLowSuccess,
    payload: sortLow,
  };
};

export const sortLowFailureAction = (error: any): SortLowFailureAction => ({
  type: sortLowFailure,
  payload: error,
});

export const productDetailRequestAction = (id:any,user_id:any): ProductDetailRequestAction => ({
  type: productDetailRequest,
  payload:{id,user_id}
});
export const productDetailSuccessAction = (products: any): ProductDetailSuccessAction => ({
  type: productDetailSuccess,
  payload: products,
});
export const productDetailFailureAction = (products: any): ProductDetailFailureAction => ({
  type: productDetailFailure,
  payload: products,
});