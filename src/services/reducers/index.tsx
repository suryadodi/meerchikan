// reducers/index.ts
import { combineReducers } from 'redux';
import bannerReducer from './bannerReducer'; // Adjust path as needed
import subCategoryReducer from './subCategoryReducer';
import productReducer from './productReducer';
import featureReducer from './featureReducer';
import signupReducer from './signupReducer';
import loginReducer from './loginReducer';
import otpReducer from './otpReducer';
import addressReducer from './addressReducer';
import userReducer from './profileReducer';
import CartReducer from './cartReducer';
import SellerReducer from './sellerReducer';
import trendingReducer from './trendingReducer';

// import SortReducer from './sortReducer';
// import pageReducer from './pageReducer';

const rootReducer = combineReducers({
  banner: bannerReducer,
  product: productReducer,
  feature: featureReducer,
  trending:trendingReducer,
  subCategory:subCategoryReducer,
  login:loginReducer,
  signup: signupReducer,
  otp:otpReducer,
  address: addressReducer,
  cart:CartReducer,
  seller:SellerReducer,
  // sort :SortReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Type for useSelector
export default rootReducer;
