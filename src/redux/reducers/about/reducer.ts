import {
    FETCH_ABOUT_REQUEST,
    FETCH_ABOUT_SUCCESS,
    FETCH_ABOUT_FAILURE,
} from './actionTypes';

import { aboutActions, aboutState } from './types';

const initialState: aboutState = {
    pending: false,
    about: [],
    error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: aboutActions) => {
    switch (action.type) {
    //fetch categort    
    case FETCH_ABOUT_REQUEST:
        return {
          ...state,
          pending: true,
        };
    case FETCH_ABOUT_SUCCESS:
        return {
          ...state,
          pending: false,
          about: action.payload.about,
          error: null,
        };
    case FETCH_ABOUT_FAILURE:
        return {
            ...state,
            pending: false,
            about: [],
            error: action.payload.error,
        };
    default:
        return {
          ...state,
        };
    }
};