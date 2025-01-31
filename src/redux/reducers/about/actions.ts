import {
    FETCH_ABOUT_REQUEST,
    FETCH_ABOUT_SUCCESS,
    FETCH_ABOUT_FAILURE,
} from './actionTypes';

import {
    FetchAboutSuccess,
    SuccessPayload,
    FetchAboutFailure,
    FailurePayload
} from './types';

//fetch about
export const fetchAboutRequest = (
    data:any = ''
  ): any => ({
    type: FETCH_ABOUT_REQUEST,
    data
});

export const fetchAboutSuccess = (
    payload: SuccessPayload,
  ): FetchAboutSuccess => ({
    type: FETCH_ABOUT_SUCCESS,
    payload
  });
  
export const fetchAboutFailure = (
  payload: FailurePayload
): FetchAboutFailure => ({
  type: FETCH_ABOUT_FAILURE,
  payload
});