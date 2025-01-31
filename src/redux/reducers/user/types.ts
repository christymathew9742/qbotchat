
import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
} from './actionTypes';


export interface SuccessPayload {
    user: any[];
}
export interface FailurePayload {
    error: string;
}
export interface userState {
    pending: boolean;
    user: any[];
    error: string | null;
}

export interface FetchUsertRequest {
    type: typeof FETCH_USER_REQUEST;
}
export type FetchUserSuccess = {
    type: typeof FETCH_USER_SUCCESS;
    payload: SuccessPayload;
};
export type FetchUserFailure = {
    type: typeof FETCH_USER_FAILURE;
    payload: FailurePayload;
};

export type userActions =
    | FetchUsertRequest
    | FetchUserSuccess
    | FetchUserFailure;