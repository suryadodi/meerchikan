import { UUID } from "crypto";

export const CartActions = {
    INITIAL_CART_REQUEST:"INITIAL_CART_REQUEST",
    INITIAL_CART_SUCCESS: "INITIAL_CART_SUCCESS",
    ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",
    ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
    ADD_TO_CART_SUCCESS:"ADD_TO_CART_SUCCESS",
    ADD_TO_CART_UPDATE:"ADD_TO_CART_UPDATE",
    INCREASE_ITEM_QUANTITY: "INCREASE_ITEM_QUANTITY",
    DECREASE_ITEM_QUANTITY : 'DECREASE_ITEM_QUANTITY',
    REMOVE_ITEM_FROM_CART :'REMOVE_ITEM_FROM_CART',
    REMOVE_ITEM_CART :'REMOVE_ITEM_CART',
    UPDATE_ATTRIBUTES: "UPDATE_ATTRIBUTES",
    CART_TOTAL :'CART_TOTAL',
    CATEGORY_ID :'CATEGORY_ID',
    CART_OPEN_CLOSE:'CART_OPEN_CLOSE'
  };
  
    // export interface CartItem {
    //   product_id: string;
    //   image: string;
    //   name: string;
    //   attributes: object;
    //   price: number;
    //   quantity: number | null;
    //   user_id:string | null;
    // };
    
  
  export interface initialCartRequest {
    type: typeof CartActions.INITIAL_CART_REQUEST;
    payload: {id:string};
  }
  
  interface AddToCartRequestAction {
    type: typeof CartActions.ADD_TO_CART_REQUEST;
    payload: any;
  }

  interface AddToCartSuccessAction {
    type: typeof CartActions.ADD_TO_CART_SUCCESS;
    payload: any;
  }

  interface AddToCartUpdateAction {
    type: typeof CartActions.ADD_TO_CART_UPDATE;
    payload: any;
  }
  
  interface InitialCartSuccessAction {
    type: typeof CartActions.INITIAL_CART_SUCCESS;
    payload: any;
  }
  
  
  export interface IncreaseItemQuantityAction {
    type: typeof CartActions.INCREASE_ITEM_QUANTITY;
    payload: { id:number,user_id:string,price:number};
  }
  
  export interface DecreaseItemQuantityAction {
    type: typeof CartActions.DECREASE_ITEM_QUANTITY;
    payload: { id: number,user_id:string ,val:number|null,price:number};
  }
  
  export interface RemoveItemFromCartAction {
    type: typeof CartActions.REMOVE_ITEM_FROM_CART;
    payload: { id: number,user_id:string };
  }
  export interface RemoveItemCartAction {
    type: typeof CartActions.REMOVE_ITEM_CART;
    payload: { id: number,user_id:string };
  }
  export interface CartTotalAction {
    type: typeof CartActions.CART_TOTAL;
    payload: { data:any };
  }

  interface UpdateAttributesAction {
    type: typeof CartActions.UPDATE_ATTRIBUTES;
    payload: {
      id: string;
      selectedQuantity: string;
      selectedPrice: number;
    };
  }

  interface CategoryIdAction {
    type: typeof CartActions.CATEGORY_ID;
    payload: any;
  }
  interface CartOpenAction {
    type: typeof CartActions.CATEGORY_ID;
    payload: any;
  }

  
  
  export type CartActionTypes =
    | AddToCartRequestAction|AddToCartSuccessAction|AddToCartUpdateAction
    | InitialCartSuccessAction
    | IncreaseItemQuantityAction|RemoveItemFromCartAction|DecreaseItemQuantityAction
    |UpdateAttributesAction|initialCartRequest|CartTotalAction|RemoveItemCartAction|CategoryIdAction|CartOpenAction
  
  // // Action Creators
  export const initialCartRequest= (id: string): CartActionTypes => {
      return {
    type: CartActions.INITIAL_CART_REQUEST,
    payload: { id},
  }};
  
  export const addToCartRequest = (product: any): CartActionTypes => {
    return {
      type: CartActions.ADD_TO_CART_REQUEST,
      payload: product,
    };
  };

  export const addToCartSuccess = (addedItem: any): CartActionTypes => {
    return{
    type: CartActions.ADD_TO_CART_SUCCESS,
    payload: addedItem,
  }};
  
  export const addToCartUpdate = (addedItem: any): CartActionTypes => {
    return{
    type: CartActions.ADD_TO_CART_UPDATE,
    payload: addedItem,
  }};
  
  export const initialCartSuccess = (addedItem: any): CartActionTypes => {
    return{
    type: CartActions.INITIAL_CART_SUCCESS,
    payload: addedItem,
  }};
  
  export const increaseItemQuantity = (id: number,user_id:string,offered_price:number,selling_price:number): CartActionTypes => {
    return {
      type: CartActions.INCREASE_ITEM_QUANTITY,
      payload: { id ,user_id,offered_price,selling_price},
    };
  };
  
  export const decreaseItemQuantity = (id: number,user_id:string,val:number|null,offered_price:number,selling_price:number): CartActionTypes => {
    return{
    type: CartActions.DECREASE_ITEM_QUANTITY,
    payload: { id ,user_id,val,offered_price,selling_price},
  }};
  
  export const removeItemFromCart = (id: number,user_id:string): CartActionTypes => {
    return{
    type: CartActions.REMOVE_ITEM_FROM_CART,
    payload: { id,user_id },
  }};

  export const removeItemCart = (id: number,user_id:string): CartActionTypes => {
    return{
    type: CartActions.REMOVE_ITEM_CART,
    payload: { id,user_id },
  }};
  // export const updateAttributes = (id: string, selectedQuantity: string, selectedPrice: number): UpdateAttributesAction => ({
  //   type: CartActions.UPDATE_ATTRIBUTES,
  //   payload: { id, selectedQuantity, selectedPrice },
  // });
  
  export const cartTotal = (data: any): CartActionTypes => {
    return{
    type: CartActions.CART_TOTAL,
    payload: data,
  }};
  export const categoryIdAction=(id:any):CategoryIdAction=>{
    return{
      type: CartActions.CATEGORY_ID,
      payload: id,
    }
  }

  export const cartOpenAction=(open:any):CartOpenAction=>{
    return{
      type:CartActions.CART_OPEN_CLOSE,
      payload:open
    }
  }