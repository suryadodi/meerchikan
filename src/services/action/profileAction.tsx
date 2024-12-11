// actions/userActions.ts

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export interface Details {
  name: string;
  email: string;
  mobile: string;
}

export const fetchUserRequest = (userId: string) => ({
  type: FETCH_USER_REQUEST,
  payload: userId,
});

export const fetchUserSuccess = (user: Details) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error: string) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const updateUserRequest = (id: string, userDetails: Details) => ({
  type: UPDATE_USER_REQUEST,
  payload: { id, userDetails },
});

export const updateUserSuccess = (user: Details) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error: string) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});
