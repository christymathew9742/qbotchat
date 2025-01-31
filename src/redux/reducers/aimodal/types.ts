
import {
    FETCH_AI_REQUEST,
    FETCH_AI_SUCCESS,
    FETCH_AI_FAILURE,
    FETCH_POST_AI_REQUEST,
    FETCH_POST_AI_SUCCESS,
    FETCH_POST_AI_FAILURE,
} from './actionTypes';


export interface SuccessPayload {
    ai: any[];
}
export interface FailurePayload {
    error: string;
}
export interface aiState {
    pending: boolean;
    ai: any[];
    error: string | null;
}

export interface FetchAiRequest {
    type: typeof FETCH_AI_REQUEST;
}
export type FetchAiSuccess = {
    type: typeof FETCH_AI_SUCCESS;
    payload: SuccessPayload;
};
export type FetchAiFailure = {
    type: typeof FETCH_AI_FAILURE;
    payload: FailurePayload;
};

export type FetchPostAiRequest = {
    type: typeof FETCH_POST_AI_REQUEST;
};

export type PostAiSuccess = {
    type: typeof FETCH_POST_AI_SUCCESS;
    payload: SuccessPayload;
};

export type PostAiFailure = {
    type: typeof FETCH_POST_AI_FAILURE;
    payload: FailurePayload;
};

export type aiActions =
    | FetchAiRequest
    | FetchAiSuccess
    | FetchAiFailure
    | FetchPostAiRequest
    | PostAiSuccess
    | PostAiFailure;