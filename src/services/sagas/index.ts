import { all, fork } from 'redux-saga/effects';
import { bannerSaga } from './bannerSaga';
import { categorySaga } from './categorysaga';
import { productSaga } from './productsaga';
import { subCategorySaga } from './subCategorysaga';
import { featureSaga } from './featuresaga';
import { categoryProductSaga } from './categoryProductsaga';
import { subCategoryProductSaga } from './subcategoryproductsaga';
import { loginSaga } from './loginSaga';
import { addressSaga } from './addressSaga';
import { signupSaga } from './signupSaga';
import { otpSaga } from './otpSaga';
import { addCartSaga } from './cartsaga';
import { sellerSaga } from './sellersaga';
import { userSaga } from './profileSaga';
import { sortSaga } from './sortsaga';
import { sellerPageSaga } from './sellerPagesaga';
import { trendingSaga } from './trendingSaga';
// import { updateSaga } from './profileSaga';

export default function* rootSaga() {
  yield all([
    ...bannerSaga,
    ...categorySaga,
    ...productSaga,
    ...featureSaga,
    ...subCategorySaga,
    ...loginSaga,
    ...signupSaga,
    ...addressSaga,
    ...categoryProductSaga,
    ...subCategoryProductSaga,
    ...otpSaga,
    ...userSaga,
    ...addCartSaga,
    ...sellerSaga,
    ...sortSaga,
    ...sellerPageSaga,
    ...trendingSaga,
  ]);
}
