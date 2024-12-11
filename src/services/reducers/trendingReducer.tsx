import { trendingActionTypes, trendingDecrease, trendingFailure, trendingIncrease, trendingRemove, trendingRequest, trendingSuccess, trendingUpdate } from "../action/trendingAction";



interface TrendingState {
  trending: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TrendingState = {
  trending: [],
  loading: false,
  error: null,
};

const trendingReducer = (state = initialState, action: trendingActionTypes): TrendingState => {
  switch (action.type) {
    case trendingRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case trendingSuccess:{
        console.log(action.payload.trending,"actionpendingpayload")
        let cartStateFromLocalStorage:any = localStorage.getItem("persist:root");
        let parsedCartState: any = JSON.parse(cartStateFromLocalStorage)
        let cart = JSON.parse(parsedCartState.cart);
        const updatedProducts = action.payload.trending.map((item: any) => {
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
          trending: updatedProducts,
        };
      }
    case trendingFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case trendingIncrease: {
        const updatedItem = state.trending.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
        return {
          ...state,
          loading: false,
          trending: updatedItem,
        };
      }
  
      case trendingDecrease: {
        const updatedItem = state.trending.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : null }
            : item
        );
        return {
          ...state,
          loading: false,
          trending: updatedItem,
        };
      }

      case trendingUpdate:{
        const updatedProducts = state.trending.map((item: any) => {
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
          trending: updatedProducts,
        };
      }

      case trendingRemove: {
        const removedItem = state.trending.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: null } : item
        );
        return {
          ...state,
          loading:false,
          trending: removedItem,
        };
      }

    default:
      return state;
  }
};

export default trendingReducer;
