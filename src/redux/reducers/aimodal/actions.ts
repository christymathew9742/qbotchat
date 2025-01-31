import {
    FETCH_AI_REQUEST,
    FETCH_AI_SUCCESS,
    FETCH_AI_FAILURE,
    FETCH_POST_AI_REQUEST,
    FETCH_POST_AI_SUCCESS,
    FETCH_POST_AI_FAILURE,
} from './actionTypes';

import {
    FetchAiSuccess,
    SuccessPayload,
    FetchAiFailure,
    FailurePayload,
} from './types';

//fetch User
export const fetchAiRequest = (
  payload:any = ''
  ): any => ({
    type: FETCH_AI_REQUEST,
    payload
});

export const fetchAiSuccess = (
    payload: SuccessPayload,
  ): FetchAiSuccess => ({
    type: FETCH_AI_SUCCESS,
    payload
  });
  
export const fetchAiFailure = (
  payload: FailurePayload
): FetchAiFailure => ({
  type: FETCH_AI_FAILURE,
  payload
});

//post category
export const fetchPostAiRequest = (
  prompt: any = '',
): any => ({
  type: FETCH_POST_AI_REQUEST,
  prompt,
});
  
export const postAiSuccess = (payload: any): any => ({
  type: FETCH_POST_AI_SUCCESS,
  payload,
});
  
export const postAiFailure = (payload: any): any => ({
  type: FETCH_POST_AI_FAILURE,
  payload,
}); 