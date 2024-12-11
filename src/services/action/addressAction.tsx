export const FETCH_USER_ADDRESS_REQUEST = 'FETCH_USER_ADDRESS_REQUEST';
export const FETCH_USER_ADDRESS_SUCCESS = 'FETCH_USER_ADDRESS_SUCCESS';
export const FETCH_USER_ADDRESS_FAILURE = 'FETCH_USER_ADDRESS_FAILURE';

export const SAVE_ADDRESS_REQUEST = 'SAVE_ADDRESS_REQUEST';
export const SAVE_ADDRESS_SUCCESS = 'SAVE_ADDRESS_SUCCESS';
export const SAVE_ADDRESS_FAILURE = 'SAVE_ADDRESS_FAILURE';

export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_FAILURE = 'DELETE_ADDRESS_FAILURE';

export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';




export interface AddressType {
    id: string;
    mobile: string;
    state: string;
    user: string;
    city: string;
    address: string;
    landmark: string;
    save_address_as: string;
    name: string;
    pincode:string;
  }
  
export const fetchUserAddressRequest = (userId: string) => ({
  type: FETCH_USER_ADDRESS_REQUEST,
  payload: userId
});

export const fetchUserAddressSuccess = (addresses: AddressType[]) => ({
  type: FETCH_USER_ADDRESS_SUCCESS,
  payload: addresses
});

export const fetchUserAddressFailure = (error: string) => ({
  type: FETCH_USER_ADDRESS_FAILURE,
  payload: error
});

export const saveAddressRequest = (addressData: any) => ({
  type: SAVE_ADDRESS_REQUEST,
  payload: addressData
});

export const saveAddressSuccess = (address: AddressType) => ({
  type: SAVE_ADDRESS_SUCCESS,
  payload: address,
});

export const saveAddressFailure = (error: string) => ({
  type: SAVE_ADDRESS_FAILURE,
  payload: error
});

export const deleteAddressRequest = (id: string) => ({
  type: DELETE_ADDRESS_REQUEST,
  payload: id
});

export const deleteAddressSuccess = (id: string) => ({
  type: DELETE_ADDRESS_SUCCESS,
  payload: id
});

export const deleteAddressFailure = (error: string) => ({
  type: DELETE_ADDRESS_FAILURE,
  payload: error
});

export const updateAddressRequest = (addressData: any) => ({
  type: UPDATE_ADDRESS_REQUEST,
  payload: addressData
});

export const updateAddressSuccess = (address:AddressType) => ({
  type: UPDATE_ADDRESS_SUCCESS,
  payload: address,
});

export const updateAddressFailure = (error: string) => ({
  type: UPDATE_ADDRESS_FAILURE,
  payload: error
});

export const setSelectedAddress = (address: AddressType) => ({
  type: 'SET_SELECTED_ADDRESS',
  payload: address,
});


