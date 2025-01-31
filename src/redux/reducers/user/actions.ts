import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
} from './actionTypes';

import {
    FetchUserSuccess,
    SuccessPayload,
    FetchUserFailure,
    FailurePayload
} from './types';

//fetch User
export const fetchUserRequest = (
    data:any = ''
  ): any => ({
    type: FETCH_USER_REQUEST,
    data
});

export const fetchUserSuccess = (
    payload: SuccessPayload,
  ): FetchUserSuccess => ({
    type: FETCH_USER_SUCCESS,
    payload
  });
  
export const fetchUserFailure = (
  payload: FailurePayload
): FetchUserFailure => ({
  type: FETCH_USER_FAILURE,
  payload
});