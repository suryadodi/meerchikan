export const sellerRequest = "SELLER_REQUEST";
export const sellerSuccess = "SELLER_SUCCESS";
export const sellerFailure = "SELLER_FAILURE";
export const sellerIncrease = "SELLER_INCREASE";
export const sellerDecrease = "SELLER_DECREASE";
export const sellerRemove = "SELLER_REMOVE";
export const sellerUpdate = "SELLER_UPDATE";
export interface SellerRequestAction {
  type: typeof sellerRequest;
  payload: any;
}

interface SellerSuccessAction {
  type: typeof sellerSuccess;
  payload: any;
}

interface SellerFailureAction {
  type: typeof sellerFailure;
  payload: any;
}

export interface SellerIncreaseAction {
  type: typeof sellerIncrease;
  payload: any;
}

export interface SellerDecreaseAction {
  type: typeof sellerDecrease;
  payload: any;
}

export interface SellerRemoveAction {
  type: typeof sellerRemove;
  payload: any;
}

export interface SellerUpdateAction {
  type: typeof sellerUpdate;
  payload: any;
}

export type SellerActionTypes =
  | SellerRequestAction
  | SellerSuccessAction
  | SellerFailureAction
  | SellerIncreaseAction
  | SellerDecreaseAction
  | SellerRemoveAction
  | SellerUpdateAction

export const sellerRequestAction = (id: any): SellerActionTypes => {
  return {
    type: sellerRequest,
    payload: { id },
  };
};

export const sellerSuccessAction = (sellers: any): SellerActionTypes => ({
  type: sellerSuccess,
  payload: sellers,
});

export const sellerFailureAction = (error: any): SellerActionTypes => ({
  type: sellerFailure,
  payload: error,
});
export const sellerIncreaseAction = (data: any): SellerActionTypes => {
  return {
    type: sellerIncrease,
    payload: data,
  };
};

export const sellerDecreaseAction = (data: any): SellerActionTypes => {
  return {
    type: sellerDecrease,
    payload: data,
  };
};

export const sellerRemoveAction = (data: any): SellerActionTypes => {
  return {
    type: sellerRemove,
    payload: data,
  };
};

export const sellerUpdateAction = (data: any): SellerUpdateAction => ({
  type: sellerUpdate,
  payload: data,
});

