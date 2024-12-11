import {
  categoryProductFailure,
  categoryProductRequest,
  subCategoryProductFailure,
  subCategoryProductRequest,
  subCategoryProductSuccess,
  categoryProductSuccess,
  ProductActionTypes,
  productFailure,
  productRequest,
  productSuccess,
  setPage,
  setTotalPages,
  categoryFailure,
  categoryRequest,
  categorySuccess,
  productIncrease,
  productDecrease,
  productRemove,
  categoryProductIncrease,
  categoryProductDecrease,
  subCategoryProductIncrease,
  subCategoryProductDecrease,
  sellerPageRequest,
  sellerPageSuccess,
  sellerPageFailure,
  sortLowSuccess,
  sortLowFailure,
  sortLowRequest,
  sortFailure,
  sortSuccess,
  sortRequest,
  categoryProductRemove,
  subCategoryProductRemove,
  productUpdate,
  categoryProductUpdate,
  subCategoryProductUpdate,
  productDetailRequest,
  productDetailSuccess,
  productDetailFailure,
} from "../action/productAction";

interface ProductState {
  products: any[];
  categorys: any[];
  categoryProduct: any[];
  subCategoryProduct: any[];
  productDetail: any;
  sellersPage: any[];
  sorts: any[];
  currentPage: any;
  totalPages: any;
  itemsPerPage: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  categorys: [],
  categoryProduct: [],
  subCategoryProduct: [],
  sellersPage: [],
  sorts: [],
  productDetail: {},
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 12,
  loading: false,
  error: null,
};

const productReducer = (
  state = initialState,
  action: ProductActionTypes
): ProductState => {
  switch (action.type) {
    case productRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case productSuccess: {
      let cartStateFromLocalStorage: any = localStorage.getItem("persist:root");
      let parsedCartState: any = JSON.parse(cartStateFromLocalStorage);
      let cart = JSON.parse(parsedCartState.cart);
      const updatedProducts = action.payload.product.map((item: any) => {
        const update = action.payload.cart.find(
          (x: any) => x.product_id === item.id
        );
        const updated = cart.item.find((x: any) => x.product_id === item.id);

        if (update && action.payload.id) {
          const newQuantity =
            update.quantity !== null ? update.quantity : item.quantity;
          return { ...item, quantity: newQuantity };
        } else if (updated) {
          const newQuantity =
            updated.quantity !== null ? updated.quantity : item.quantity;
          return { ...item, quantity: newQuantity };
        }

        return item;
      });

      return {
        ...state,
        loading: false,
        products: updatedProducts,
        totalPages: action.payload.totalePage,
        currentPage: action.payload.currentPage,
      };
    }
    case productUpdate: {
      const updatedProducts = state.products.map((item: any) => {
        const update = action.payload.find(
          (x: any) => x.product_id === item.id
        );

        if (update) {
          console.log("execute user");

          const newQuantity =
            update.quantity !== null ? update.quantity : item.quantity;
          return { ...item, quantity: newQuantity };
        }

        return item;
      });
      const updateDetail = action.payload.find(
        (x: any) => x.product_id === state.productDetail.id
      );
      const updateDetails = updateDetail
        ? {
            ...state.productDetail,
            quantity: updateDetail.quantity,
          }
        : state.productDetail;
      return {
        ...state,
        loading: false,
        products: updatedProducts,
        productDetail: updateDetails,
      };
    }
    case productFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case productIncrease: {
      const updatedItem = state.products.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      const updateDetail =
        state.productDetail.id === action.payload.id
          ? {
              ...state.productDetail,
              quantity: state.productDetail.quantity + 1,
            }
          : state.productDetail;
      return {
        ...state,
        loading: false,
        products: updatedItem,
        productDetail: updateDetail,
      };
    }

    case productDecrease: {
      const updatedItem = state.products.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : null }
          : item
      );
      const updateDetail =
        state.productDetail.id === action.payload.id
          ? {
              ...state.productDetail,
              quantity:
                state.productDetail.quantity > 1
                  ? state.productDetail.quantity - 1
                  : null,
            }
          : state.productDetail;
      return {
        ...state,
        loading: false,
        products: updatedItem,
        productDetail: updateDetail,
      };
    }

    case productRemove: {
      const removedItem = state.products.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: null } : item
      );
      const removeDetail =
        state.productDetail.id === action.payload.id
          ? {
              ...state.productDetail,
              quantity: null,
            }
          : state.productDetail;
      return {
        ...state,
        loading: false,
        products: removedItem,
        productDetail: removeDetail,
      };
    }
    case categoryRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case categorySuccess:
      return {
        ...state,
        loading: false,
        categorys: action.payload,
      };

    case categoryFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case categoryProductUpdate: {
      const updatedProducts = state.categoryProduct.map((item: any) => {
        const update = action.payload.find(
          (x: any) => x.product_id === item.id
        );

        if (update) {
          console.log("execute user");

          const newQuantity =
            update.quantity !== null ? update.quantity : item.quantity;
          return { ...item, quantity: newQuantity };
        }

        return item;
      });

      return {
        ...state,
        loading: false,
        categoryProduct: updatedProducts,
      };
    }

    case categoryProductIncrease: {
      const updatedItem = state.categoryProduct.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        categoryProduct: updatedItem,
      };
    }

    case categoryProductDecrease: {
      const updatedItem = state.categoryProduct.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : null }
          : item
      );
      return {
        ...state,
        categoryProduct: updatedItem,
      };
    }

    case categoryProductRemove: {
      const removedItem = state.categoryProduct.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: null } : item
      );
      return {
        ...state,
        loading: false,
        categoryProduct: removedItem,
      };
    }

    case categoryProductRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case categoryProductSuccess: {
      const cartStateFromLocalStorage = localStorage.getItem("persist:root");
      const parsedCartState: any = cartStateFromLocalStorage
        ? JSON.parse(cartStateFromLocalStorage)
        : { cart: [] };
      const cart = JSON.parse(parsedCartState.cart);
      const updatedProducts = action.payload.categoryProduct.map(
        (item: any) => {
          const update = action.payload.cart.find(
            (x: any) => x.product_id === item.id
          );

          const updated = cart.item.find((x: any) => x.product_id === item.id);

          if (update) {
            const newQuantity =
              update.quantity !== null ? update.quantity : item.quantity;
            return { ...item, quantity: newQuantity };
          } else if (updated) {
            const newQuantity =
              updated.quantity !== null ? updated.quantity : item.quantity;
            return { ...item, quantity: newQuantity };
          }

          return item;
        }
      );

      return {
        ...state,
        loading: false,
        categoryProduct: updatedProducts,
        totalPages: action.payload.totalPage,
        currentPage: action.payload.currentPage,
      };
    }

    case categoryProductFailure: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case subCategoryProductUpdate: {
      const updatedProducts = state.subCategoryProduct.map((item: any) => {
        const update = action.payload.find(
          (x: any) => x.product_id === item.id
        );

        if (update) {
          console.log("execute user");

          const newQuantity =
            update.quantity !== null ? update.quantity : item.quantity;
          return { ...item, quantity: newQuantity };
        }

        return item;
      });

      return {
        ...state,
        loading: false,
        subCategoryProduct: updatedProducts,
      };
    }

    case subCategoryProductRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case subCategoryProductSuccess: {
      const cartStateFromLocalStorage = localStorage.getItem("persist:root");
      const parsedCartState: any = cartStateFromLocalStorage
        ? JSON.parse(cartStateFromLocalStorage)
        : { cart: [] };
      const cart = JSON.parse(parsedCartState.cart);
      const updatedProducts = action.payload.subCategoryProduct.map(
        (item: any) => {
          const update = action.payload.cart.find(
            (x: any) => x.product_id === item.id
          );

          const updated = cart.item.find((x: any) => x.product_id === item.id);

          if (update) {
            const newQuantity =
              update.quantity !== null ? update.quantity : item.quantity;
            return { ...item, quantity: newQuantity };
          } else if (updated) {
            const newQuantity =
              updated.quantity !== null ? updated.quantity : item.quantity;
            return { ...item, quantity: newQuantity };
          }

          return item;
        }
      );
      return {
        ...state,
        loading: false,
        subCategoryProduct: updatedProducts,
        totalPages: action.payload.totalPage,
        currentPage: action.payload.currentPage,
      };
    }
    case subCategoryProductFailure: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }

    case subCategoryProductIncrease: {
      const updatedItem = state.subCategoryProduct.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        subCategoryProduct: updatedItem,
      };
    }

    case subCategoryProductDecrease: {
      const updatedItem = state.subCategoryProduct.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : null }
          : item
      );
      return {
        ...state,
        subCategoryProduct: updatedItem,
      };
    }

    case subCategoryProductRemove: {
      const removedItem = state.subCategoryProduct.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: null } : item
      );
      return {
        ...state,
        loading: false,
        subCategoryProduct: removedItem,
      };
    }

    case sellerPageRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case sellerPageSuccess:
      return {
        ...state,
        loading: false,
        sellersPage: action.payload.seller,
        totalPages: action.payload.totalePage,
        currentPage: action.payload.currentPage,
      };
    case sellerPageFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case setPage:
      return {
        ...state,
        currentPage: action.payload,
      };
    case setTotalPages:
      return {
        ...state,
        totalPages: action.payload,
      };
    case sortRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case sortSuccess:
      return {
        ...state,
        loading: false,
        sorts: action.payload.sort,
        totalPages: action.payload.totalePage,
        currentPage: action.payload.currentPage,
      };
    case sortFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case sortLowRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case sortLowSuccess:
      return {
        ...state,
        loading: false,
        sorts: action.payload.sort,
        totalPages: action.payload.totalePage,
        currentPage: action.payload.currentPage,
      };
    case sortLowFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productDetailRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case productDetailSuccess:
      let cartStateFromLocalStorage: any = localStorage.getItem("persist:root");
      let parsedCartState: any = JSON.parse(cartStateFromLocalStorage);
      let cart = JSON.parse(parsedCartState.cart);
      const updated = cart.item.find(
        (x: any) => x.product_id === action.payload.id
      );
      let details=action.payload ;
      if(updated){
        details.quantity=updated.quantity 
      }   
      return {
        ...state,
        productDetail: details,
        loading: false,
        error: null,
      };
    case productDetailFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
