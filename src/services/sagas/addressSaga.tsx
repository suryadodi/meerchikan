import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { 
  FETCH_USER_ADDRESS_REQUEST, 
  FETCH_USER_ADDRESS_SUCCESS, 
  FETCH_USER_ADDRESS_FAILURE,
  SAVE_ADDRESS_REQUEST, 
  SAVE_ADDRESS_SUCCESS, 
  SAVE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST, 
  DELETE_ADDRESS_SUCCESS, 
  DELETE_ADDRESS_FAILURE, 
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  AddressType 
} from '@/services/action/addressAction';
import client from '@/apolloClient';
import { GET_USER_ADDRESS } from '@/helpers/query';
import { DELETE_USER_ADDRESS, SAVE_ADDRESS, UPDATE_USER_ADDRESS } from '@/helpers/mutation';

interface GetUserAddressData {
  mst_user_address: AddressType[];
}

interface GetUserAddressVariables {
  user: string;
}

function* fetchUserAddress(action: any) {
  try {
    const { data } = yield client.query<GetUserAddressData, GetUserAddressVariables>({
      query: GET_USER_ADDRESS,
      variables: { user: action.payload },
      fetchPolicy: 'network-only'
    });
    yield put({ type: FETCH_USER_ADDRESS_SUCCESS, payload: data.mst_user_address });
  } catch (error: any) {
    yield put({ type: FETCH_USER_ADDRESS_FAILURE, payload: error.message });
  }
}

function* saveAddress(action: any) {
  try {
     const {data} = yield client.mutate({
      mutation: SAVE_ADDRESS,
      variables: action.payload,
      refetchQueries: [
        { query: GET_USER_ADDRESS, variables: { user: action.payload.user } }
      ]
    });
    yield put({ type: SAVE_ADDRESS_SUCCESS, payload: action.payload });
  } catch (error: any) {
    yield put({ type: SAVE_ADDRESS_FAILURE, payload: error.message });
  }
}

function* deleteAddress(action: any) {
  try {
    yield client.mutate({
      mutation: DELETE_USER_ADDRESS,
      variables: { id: action.payload },
      refetchQueries: [
        { query: GET_USER_ADDRESS, variables: { user: action.payload.user } }
      ]
    });
    yield put({ type: DELETE_ADDRESS_SUCCESS, payload: action.payload });
  } catch (error: any) {
    yield put({ type: DELETE_ADDRESS_FAILURE, payload: error.message });
  }
}

function* updateAddress(action: any) {
  try {
    yield client.mutate({
      mutation: UPDATE_USER_ADDRESS,
      variables: action.payload,
      refetchQueries: [
        { query: GET_USER_ADDRESS, variables: { user: action.payload.user } }
      ]
    });
    yield put({ type: UPDATE_ADDRESS_SUCCESS,  payload: action.payload });
  } catch (error: any) {
    yield put({ type: UPDATE_ADDRESS_FAILURE, payload: error.message });
  }
}

function* address() {
  yield takeEvery(FETCH_USER_ADDRESS_REQUEST, fetchUserAddress);
  yield takeEvery(SAVE_ADDRESS_REQUEST, saveAddress);
  yield takeEvery(DELETE_ADDRESS_REQUEST, deleteAddress);
  yield takeEvery(UPDATE_ADDRESS_REQUEST, updateAddress);
}

export const addressSaga = [fork(address)];



