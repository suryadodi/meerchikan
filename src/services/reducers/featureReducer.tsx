
import { FeatureActionTypes, featureDecrease, featureFailure, featureIncrease, featureRemove, featureRequest, featureSuccess, featureUpdate } from "../action/featureAction";

interface FeatureState {
  features: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FeatureState = {
  features: [],
  loading: false,
  error: null,
};

const featureReducer = (state = initialState, action: FeatureActionTypes): FeatureState => {
  switch (action.type) {
    case featureRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case featureSuccess:{
        let cartStateFromLocalStorage:any = localStorage.getItem("persist:root");
        let parsedCartState: any = JSON.parse(cartStateFromLocalStorage)
        let cart = JSON.parse(parsedCartState.cart);
        const updatedProducts = action.payload.feature.map((item: any) => {
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
          features: updatedProducts,
        };
      }
    case featureFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case featureIncrease: {
        const updatedItem = state.features.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
        return {
          ...state,
          loading: false,
          features: updatedItem,
        };
      }
  
      case featureDecrease: {
        const updatedItem = state.features.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : null }
            : item
        );
        return {
          ...state,
          loading: false,
          features: updatedItem,
        };
      }

      case featureUpdate:{
        const updatedProducts = state.features.map((item: any) => {
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
          features: updatedProducts,
        };
      }

      case featureRemove: {
        const removedItem = state.features.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: null } : item
        );
        return {
          ...state,
          loading:false,
          features: removedItem,
        };
      }

    default:
      return state;
  }
};


export default featureReducer;
