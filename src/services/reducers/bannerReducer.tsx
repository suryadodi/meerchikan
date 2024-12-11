// reducers/bannerReducer.ts
// import { bannerSuccess, bannerRequest, bannerFailure, BannerActionTypes } from '../actions/bannerActions';

import { BannerActionTypes, bannerFailure, bannerRequest, bannerSuccess } from "../action/bannerAction";

interface BannerState {
  banners: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  loading: false,
  error: null,
};

const bannerReducer = (state = initialState, action: BannerActionTypes): BannerState => {
  switch (action.type) {
    case bannerRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case bannerSuccess:
      return {
        ...state,
        loading: false,
        banners: action.payload,
      };
    case bannerFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bannerReducer;
