import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
} from './actionTypes';

import { userActions, userState } from './types';

const initialState: userState = {
    pending: false,
    user: [],
    error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: userActions) => {
    switch (action.type) {
    //fetch categort    
    case FETCH_USER_REQUEST:
        return {
          ...state,
          pending: true,
        };
    case FETCH_USER_SUCCESS:
        return {
          ...state,
          pending: false,
          user: action.payload.user,
          error: null,
        };
    case FETCH_USER_FAILURE:
        return {
            ...state,
            pending: false,
            user: [],
            error: action.payload.error,
        };
    default:
        return {
          ...state,
        };
    }
};