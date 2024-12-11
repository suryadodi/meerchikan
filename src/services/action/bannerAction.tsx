// actions/bannerActions.ts
export const bannerSuccess = "BANNER_SUCCESS";
export const bannerRequest = "BANNER_REQUEST";
export const bannerFailure = "BANNER_FAILURE";

 export interface BannerRequestAction {
  type: typeof bannerRequest;
  payload: any;
}

interface BannerSuccessAction {
  type: typeof bannerSuccess;
  payload: any;
}

interface BannerFailureAction {
  type: typeof bannerFailure;
  payload: any;
}

export type BannerActionTypes = BannerRequestAction | BannerSuccessAction | BannerFailureAction;

export const bannerRequestAction = (data: any): BannerRequestAction => {
  return {
    type: bannerRequest,
    payload: data,
  };
};

export const bannerSuccessAction = (banners: any): BannerSuccessAction => ({
  type: bannerSuccess,
  payload: banners,
});

export const bannerFailureAction = (error: any): BannerFailureAction => ({
  type: bannerFailure,
  payload: error,
});
