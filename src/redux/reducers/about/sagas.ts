//import axios from '../../../axios';
import api from '../../../utils/axios'
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
    FETCH_ABOUT_REQUEST,
} from './actionTypes';

import { 
    fetchAboutSuccess,
    fetchAboutFailure, 
} from './actions';


//fetch about
function* fetchAboutSaga(payload:any): any {
    try {
        const response: any = yield call(api.get,`/todos/`);
        yield put (
            fetchAboutSuccess({
                about: response.data  
            })
        );
    } catch (e: any) {
        yield put(
            fetchAboutFailure({
                error: e.message
            })
        );
    }
}

function* AboutSaga() {
    yield all([takeLatest(FETCH_ABOUT_REQUEST, fetchAboutSaga)]);
}

export default AboutSaga;