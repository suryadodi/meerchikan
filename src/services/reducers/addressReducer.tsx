import address from '@/pages/my-account/address';
import { AddressType, DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS } from '../action/addressAction';
import { 
    FETCH_USER_ADDRESS_REQUEST, FETCH_USER_ADDRESS_SUCCESS, FETCH_USER_ADDRESS_FAILURE,
    SAVE_ADDRESS_REQUEST, SAVE_ADDRESS_SUCCESS, SAVE_ADDRESS_FAILURE
  } from '@/services/action/addressAction';
  
  interface AddressState {
    addresses: AddressType[];
    loading: boolean;
    error: string | null;
    selectedAddress: AddressType | null; 
  }
  
  const initialState: AddressState = {
    addresses: [],
    selectedAddress: null,
    loading: false,
    error: null
  };
  
  const addressReducer = (state = initialState, action: any): AddressState => {
    switch (action.type) {
      case FETCH_USER_ADDRESS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_USER_ADDRESS_SUCCESS:
        return { ...state, loading: false, addresses: action.payload};
      case FETCH_USER_ADDRESS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case SAVE_ADDRESS_REQUEST:
        return { ...state, loading: true, error: null };
      case SAVE_ADDRESS_SUCCESS:
        return { ...state, 
          loading: false,
          addresses: [...state.addresses, action.payload]
        };
      case SAVE_ADDRESS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case DELETE_ADDRESS_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_ADDRESS_SUCCESS:
        return {
            ...state,
            loading: false,
            addresses: state.addresses.filter(address => address.id !== action.payload)
          };
      case DELETE_ADDRESS_FAILURE:
        return { ...state, loading: false, error: action.payload };
        case UPDATE_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.map(address =>
          address.id === action.payload.id ? action.payload : address
        ) 
      };
    case UPDATE_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case 'SET_SELECTED_ADDRESS':
      return {
        ...state,
        selectedAddress: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default addressReducer;
  