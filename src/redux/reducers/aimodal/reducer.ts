import {
    FETCH_AI_REQUEST,
    FETCH_AI_SUCCESS,
    FETCH_AI_FAILURE,
    FETCH_POST_AI_REQUEST,
    FETCH_POST_AI_SUCCESS,
    FETCH_POST_AI_FAILURE,
} from './actionTypes';

import { aiActions, aiState } from './types';

const initialState: aiState = {
    pending: false,
    ai: [],
    error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: aiActions) => {
    switch (action.type) {
    //fetch categort    
    case FETCH_AI_REQUEST:
        return {
          ...state,
          pending: true,
        };
    case FETCH_AI_SUCCESS:
        return {
          ...state,
          pending: false,
          ai: action.payload.ai,
          error: null,
        };
    case FETCH_AI_FAILURE:
        return {
            ...state,
            pending: false,
            ai: [],
            error: action.payload.error,
        };
    // post category
    case FETCH_POST_AI_REQUEST:
        return {
            ...state,
            pending: true,
            aiResponse: null,
        };
    case FETCH_POST_AI_SUCCESS:
        return {
            ...state,
            pending: false,
            aiResponse: action.payload,
            ai: null,
            error: null,
        };
    case FETCH_POST_AI_FAILURE:
        return {
            ...state,
            pending: false,
            aiResponse: null,
            error: action.payload.error,
        };
    default:
        return {
          ...state,
        };
    }
};