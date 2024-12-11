export const subCategorySuccess = "SUBCATEGORY_SUCCESS";
export const subCategoryRequest = "SUBCATEGORY_REQUEST";
export const subCategoryFailure = "SUBCATEGORY_FAILURE";

export interface SubCategoryRequestAction  {
  type: typeof subCategoryRequest;
  payload: any;
}

interface SubCategorySuccessAction {
  type: typeof subCategorySuccess;
  payload: any;
}

interface SubCategoryFailureAction {
  type: typeof subCategoryFailure;
  payload: any;
}

export type SubCategoryActionTypes = SubCategoryRequestAction | SubCategorySuccessAction | SubCategoryFailureAction   ;

export const subCategoryRequestAction = (data: any): SubCategoryRequestAction => {
  return {
    type: subCategoryRequest,
    payload: data,
  };
};

export const subCategorySuccessAction = (subCategorys: any): SubCategorySuccessAction => ({
  type: subCategorySuccess,
  payload: subCategorys,
});

export const subCategoryFailureAction = (error: any): SubCategoryFailureAction => ({
  type: subCategoryFailure,
  payload: error,
});
