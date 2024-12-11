// actions/bannerActions.ts
export const featureSuccess = "FEATURE_SUCCESS";
export const featureRequest = "FEATURE_REQUEST";
export const featureFailure = "FEATURE_FAILURE";
export const featureIncrease = "FEATURE_INCREASE";
export const featureDecrease = "FEATURE_DECREASE";
export const featureRemove = "FEATURE_REMOVE";
export const featureUpdate ="FEATURE_UPDATE"

export interface FeatureRequestAction {
  type: typeof featureRequest;
  payload: any;
}

interface FeatureSuccessAction {
  type: typeof featureSuccess;
  payload: any;
}

interface FeatureFailureAction {
  type: typeof featureFailure;
  payload: any;
}
export interface FeatureIncreaseAction {
  type: typeof featureIncrease;
  payload: any;
}

export interface FeatureDecreaseAction {
  type: typeof featureDecrease;
  payload: any;
}

export interface FeatureRemoveAction {
  type: typeof featureRemove;
  payload: any;
}

export interface FeatureUpdateAction {
  type: typeof featureUpdate;
  payload: any;
}

export type FeatureActionTypes =
  | FeatureRequestAction
  | FeatureSuccessAction
  | FeatureFailureAction
  | FeatureIncreaseAction
  | FeatureDecreaseAction
  | FeatureRemoveAction
  | FeatureUpdateAction

export const featureRequestAction = (id: any): FeatureActionTypes => {
  return {
    type: featureRequest,
    payload: { id },
  };
};

export const featureSuccessAction = (features: any): FeatureActionTypes => ({
  type: featureSuccess,
  payload: features,
});

export const featureFailureAction = (error: any): FeatureActionTypes => ({
  type: featureFailure,
  payload: error,
});

export const featureIncreaseAction = (data: any): FeatureActionTypes => {
  return {
    type: featureIncrease,
    payload: data,
  };
};

export const featureDecreaseAction = (data: any): FeatureActionTypes => {
  return {
    type: featureDecrease,
    payload: data,
  };
};

export const featureRemoveAction = (data: any): FeatureActionTypes => {
  return {
    type: featureRemove,
    payload: data,
  };

  
};

export const featureUpdateAction = (data: any): FeatureUpdateAction => ({
  type: featureUpdate,
  payload: data,
});
