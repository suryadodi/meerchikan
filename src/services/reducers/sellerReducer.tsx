import {
  SellerActionTypes,
  sellerDecrease,
  sellerFailure,
  sellerIncrease,
  sellerRemove,
  sellerRequest,
  sellerSuccess,
  sellerUpdate,
} from "../action/sellerAction";

interface SellerState {
  sellers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerState = {
  sellers: [],
  loading: false,
  error: null,
};

const SellerReducer = (
  state = initialState,
  action: SellerActionTypes
): SellerState => {
  switch (action.type) {
    case sellerRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case sellerSuccess: {
      let cartStateFromLocalStorage:any = localStorage.getItem("persist:root");
      let parsedCartState: any = JSON.parse(cartStateFromLocalStorage)
      let cart = JSON.parse(parsedCartState.cart);
      const updatedProducts = action.payload.seller.map((item: any) => {
        const update = action.payload.cart.find(
          (x: any) => x.product_id === item.id
        );
               const updated = cart.item.find((x: any) => x.product_id === item.id);

        if (update && action.payload.id) {
          const newQuantity =
            update.quantity !== null ? update.quantity : item.quantity;
          return { ...item, quantity: newQuantity };
        
        } 
        else if (updated) {
          const newQuantity =
            updated.quantity !== null ? updated.quantity : item.quantity;
          return { ...item, quantity: newQuantity };
        }

        return item;
      });
      return {
        ...state,
        loading: false,
        sellers: updatedProducts,
      };
    }
    case sellerFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case sellerIncrease: {
      const updatedItem = state.sellers.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      return {
        ...state,
        loading: false,
        sellers: updatedItem,
      };
    }

    case sellerDecrease: {
      const updatedItem = state.sellers.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : null }
          : item
      );
      return {
        ...state,
        loading: false,
        sellers: updatedItem,
      };
    }

    case sellerUpdate:{
      const updatedProducts = state.sellers.map((item: any) => {
        const update = action.payload.find(
          (x: any) => x.product_id === item.id
        );

        if (update) {
          console.log("execute user");
          
          const newQuantity =
            update.quantity !== null ? update.quantity : item.quantity;
          return { ...item, quantity: newQuantity};
        
        } 

        return item;
      });

      return {
        ...state,
        loading: false,
        sellers: updatedProducts,
      };
    }

    case sellerRemove: {
      const removedItem = state.sellers.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: null } : item
      );
      return {
        ...state,
        loading: false,
        sellers: removedItem,
      };
    }
    default:
      return state;
  }
};

export default SellerReducer;
