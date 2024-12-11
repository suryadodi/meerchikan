
export const trendingSuccess = "TRENDING_SUCESS";
export const trendingRequest = "TRENDING_REQUEST";
export const trendingFailure ="TRENDING_FALIURE";
export const trendingIncrease ="TRENDING_INCREASE";
export const trendingDecrease = "TRENDING_DECREASE";
export const trendingRemove="TRENDING_REMOVE";
export const trendingUpdate= "TRENDING_UPDATE";




export interface TrendingRequestAction {
  type: typeof trendingRequest;
  payload: any;
}

interface TrendingSuccessAction {
  type: typeof trendingSuccess;
  payload: any;
}

interface TrendingFailureAction {
  type: typeof trendingFailure;
  payload: any;
}
export interface TrendingIncreaseAction {
  type: typeof trendingIncrease;
  payload: any;
}

export interface TrendingDecreaseAction {
  type: typeof trendingDecrease;
  payload: any;
}

export interface TrendingRemoveAction {
  type: typeof trendingRemove;
  payload: any;
}

export interface TrendingUpdateAction {
  type: typeof trendingUpdate;
  payload: any;
}

export type trendingActionTypes =
  | TrendingRequestAction
  | TrendingSuccessAction
  | TrendingFailureAction
  | TrendingIncreaseAction
  | TrendingDecreaseAction
  | TrendingRemoveAction
  | TrendingUpdateAction;

export const trendingRequestAction = (id: any): trendingActionTypes => {
  return {
    type: trendingRequest,
    payload: { id },
  };
};

export const trendingSuccessAction = (trending: any): trendingActionTypes => ({
  type: trendingSuccess,
  payload: trending,
});

export const trendingFailureAction = (error: any): trendingActionTypes => ({
  type: trendingFailure,
  payload: error,
});

export const trendingIncreaseAction = (data: any): trendingActionTypes => {
  return {
    type: trendingIncrease,
    payload: data,
  };
};

export const trendingDecreaseAction = (data: any): trendingActionTypes => {
  return {
    type: trendingDecrease,
    payload: data,
  };
};

export const trendingRemoveAction = (data: any): trendingActionTypes => {
  return {
    type: trendingRemove,
    payload: data,
  };
};

export const trendingUpdateAction = (data: any): TrendingUpdateAction => ({
  type: trendingUpdate,
  payload: data,
});
