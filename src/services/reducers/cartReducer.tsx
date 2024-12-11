import { CartActionTypes, CartActions } from "../action/cartAction";

export interface CartState {
  item: {
    product_id: string;
    image: string;
    product_name: string,
    attributes: any;
    price: number;
    quantity: number | null;
    offered_price:number,
    selling_price:number,
    saved_price:number;
  }[];
  total: any;
  savedTotal:any;
  loading: boolean;
  error: string | null;
  categoryId:any;
  cartOpen:boolean;
}

const initialState: CartState = {
  item: [],
  total: 0,
  loading: false,
  error: null,
  savedTotal:0,
 categoryId:null,
 cartOpen:false
};

const CartReducer = (
  state = initialState,
  action: CartActionTypes
): CartState => {
  switch (action.type) {
    case CartActions.ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
      case CartActions.ADD_TO_CART_UPDATE:
      return {
        ...state,
        loading: true,
      };
    case CartActions.ADD_TO_CART_SUCCESS:{
      console.log(action.payload,"action.payload");
      
      const updatedItems = [
        ...state.item,
        {
          ...action.payload
                }
      ];
      
      const totalPrice = updatedItems.reduce((acc: number, val: any) => {
        return acc + val.offered_price * (val.quantity ?? 0); // Ensure price reflects quantity
      }, 0);
      const totalSavedPrice = updatedItems.reduce((acc: number, val: any) => {
        return acc + val.saved_price; // Ensure price reflects quantity
      }, 0);
    
      return {
        ...state,
        loading: false,
        item: updatedItems,
        total:totalPrice,
        savedTotal:totalSavedPrice,
      };
    }
    case CartActions.INITIAL_CART_SUCCESS: {
      const totalPrice = action.payload.reduce((acc: number, val: any) => {
        return acc + val.offered_price * (val.quantity ?? 1); // Ensure price reflects quantity
      }, 0);
      const totalSavedPrice = action.payload.reduce((acc: number, val: any) => {
        return acc + val.saved_price; // Ensure price reflects quantity
      }, 0);
    
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          loading: false,
          item: action.payload,
          total:totalPrice,
          savedTotal:totalSavedPrice
        };
      }
      return {
        ...state,
        item: action.payload.user_id
          ? [action.payload]
          : [...state.item, action.payload],
          total:totalPrice,
          savedTotal:totalSavedPrice
      };
    }
    case CartActions.INCREASE_ITEM_QUANTITY: {
      const updatedItems = state.item.map((data) =>
        data.product_id === action.payload.id
          ? {
            ...data,
            quantity: (data.quantity ?? 0) + 1,
            price:data.price+action.payload.offered_price,
            saved_price: ((data.quantity ?? 0) + 1)*(action.payload.selling_price-action.payload.offered_price),
          }
          : { 
              ...data
            }
      );
     
      const totalPrice = updatedItems.reduce((acc: number, val: any) => {
        return acc + val.offered_price * (val.quantity ?? 1); // Ensure price reflects quantity
      }, 0);
      const totalSavedPrice = updatedItems.reduce((acc: number, val: any) => {
        return acc + val.saved_price; // Ensure price reflects quantity
      }, 0);
    console.log(totalPrice,"totalpice");
    
      return {
        ...state,
        item: updatedItems,
        loading: false,
        total:totalPrice,
        savedTotal:totalSavedPrice
      };
    }

    case CartActions.DECREASE_ITEM_QUANTITY: {
      const updatedItem = state.item.map((data) => {
        // Calculate the updated quantity
        const updatedQuantity = data.quantity && data.quantity > 1 ? data.quantity - 1 : null;
      
        // Check if the product ID matches
        return data.product_id === action.payload.id
          ? {
              ...data,
              quantity: updatedQuantity,
              price:data.price-action.payload.offered_price,
              saved_price: updatedQuantity ? updatedQuantity * (action.payload.selling_price-action.payload.offered_price):0, // Ensure no savedPrice if quantity is null
            }
          : { ...data };
      });
      const finalItem = updatedItem.filter((data) => data.quantity !== null);
      const totalPrice = updatedItem.reduce((acc: number, val: any) => {
        return acc + val.offered_price * (val.quantity ?? 1); // Ensure price reflects quantity
      }, 0);
      const totalSavedPrice = updatedItem.reduce((acc: number, val: any) => {
        return acc + val.saved_price; // Ensure price reflects quantity
      }, 0);
      return {
        ...state,
        item: finalItem.length ? finalItem : [],
        loading: false,
        total:totalPrice,
        savedTotal:totalSavedPrice
      };
    }

    case CartActions.REMOVE_ITEM_CART: {
     
      const removedItem = state.item.filter(
        (data) => data.product_id !== action.payload.id
      );
      const totalPrice = removedItem.reduce((acc: number, val: any) => {
        return acc + val.offered_price * (val.quantity ?? 1); // Ensure price reflects quantity
      }, 0);
      const totalSavedPrice = removedItem.reduce((acc: number, val: any) => {
        return acc + val.saved_price; // Ensure price reflects quantity
      }, 0);
      return {
        ...state,
        item: removedItem,
        loading: false,
        total:totalPrice,
        savedTotal:totalSavedPrice
      };
    }
    
    case CartActions.CATEGORY_ID: {
      return{
        ...state,
        categoryId:action.payload
      }
    }
    case CartActions.CART_OPEN_CLOSE:{
      return{
        ...state,
        cartOpen:action.payload
      }
    }
    // case CartActions.CART_TOTAL: {
    //   const updatedItems = state.item.map((data) => {
    //     const matchingItem = action.payload.find(
    //       (val: any) => val.product_id === data.product_id
    //     );
    //     return matchingItem ? matchingItem : data;
    //   });

    //   const totalPrice = action.payload.reduce(
    //     (total: number, item: any) => total + item.price,
    //     0
    //   );
      
    //   return {
    //     ...state,
    //     item: updatedItems,
    //     total: totalPrice,
    //     loading: false,
    //   };
    // }

    // case CartActions.UPDATE_ATTRIBUTES: {
    //   const updatedItems = state.item.map(item =>
    //     item.id === action.payload.id
    //       ? { ...item, selectedQuantity: action.payload.selectedQuantity, selectedPrice: action.payload.selectedPrice }
    //       : item
    //   );
    //   return { ...state, item: updatedItems };
    // }
    default:
      return state;
  }
};

export default CartReducer;
