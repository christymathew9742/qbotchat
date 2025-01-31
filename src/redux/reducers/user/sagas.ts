import api from '../../../utils/axios'
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
    FETCH_USER_REQUEST,
} from './actionTypes';

import { 
    fetchUserSuccess,
    fetchUserFailure, 
} from './actions';

//fetch user
function* fetchUserSaga(payload:any): any {
    try {
        const response: any = yield call(api.get, `/auth/user/`);
        yield put (
            fetchUserSuccess({
                user: response.data  
            })
        );
    } catch (e: any) {
        yield put(
            fetchUserFailure({
                error: e.message
            })
        );
        console.error(e)
    }
}

function* UserSaga() {
    yield all([takeLatest(FETCH_USER_REQUEST, fetchUserSaga)]);
}

export default UserSaga;



