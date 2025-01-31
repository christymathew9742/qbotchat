
import {
    FETCH_ABOUT_REQUEST,
    FETCH_ABOUT_SUCCESS,
    FETCH_ABOUT_FAILURE,
} from './actionTypes';


export interface SuccessPayload {
    about: any[];
}
export interface FailurePayload {
    error: string;
}
export interface aboutState {
    pending: boolean;
    about: any[];
    error: string | null;
}

export interface FetchAbouttRequest {
    type: typeof FETCH_ABOUT_REQUEST;
}
export type FetchAboutSuccess = {
    type: typeof FETCH_ABOUT_SUCCESS;
    payload: SuccessPayload;
};
export type FetchAboutFailure = {
    type: typeof FETCH_ABOUT_FAILURE;
    payload: FailurePayload;
};

export type aboutActions =
    | FetchAbouttRequest
    | FetchAboutSuccess
    | FetchAboutFailure;