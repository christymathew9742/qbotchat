import api from '../../../utils/axios'
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
    FETCH_POST_AI_REQUEST
} from './actionTypes';

import { 
    fetchAiSuccess,
    fetchAiFailure, 
    postAiSuccess,
    postAiFailure
} from './actions';

const postAi: any = (prompt: any) => api.post<any[]>(`/aimodals/`,prompt);

function* fetchPostAndFetchAiSaga(payload: any): any {
    try {
        const postResponse: any = yield call(postAi, payload.prompt);
        const id = postResponse.data?.data?.data?._id;
        yield put(
            postAiSuccess({
                ai: postResponse.data,
            })
        );
        console.log(postResponse,'idddddddddddddddddddddddddddd')
        if (id) {
            const fetchResponse: any = yield call(api.get, `/aimodals/${id}`);
                yield put(
                    fetchAiSuccess({
                        ai: fetchResponse.data,
                    })
                );
              
        } else {
            throw new Error("ID not found in the post response.");
        }
    } catch (e: any) {
        yield put(
            postAiFailure({
                error: e.message,
            })
        );
        yield put(
            fetchAiFailure({
                error: e.message,
            })
        );

        console.error(e);
    }
}

function* AiSaga() {
    yield all([takeLatest(FETCH_POST_AI_REQUEST, fetchPostAndFetchAiSaga)]);
}

export default AiSaga;

//-backup-///
// import api from '../../../utils/axios'
// import { all, call, put, takeLatest } from 'redux-saga/effects';

// import {
//     FETCH_AI_REQUEST,
//     FETCH_POST_AI_REQUEST
// } from './actionTypes';

// import { 
//     fetchAiSuccess,
//     fetchAiFailure, 
//     postAiSuccess,
//     postAiFailure
// } from './actions';

// //post prompt
// const postAi: any = (prompt: any) => api.post<any[]>(`/aimodals/`,prompt);

// //fetch ai
// function* fetchAiSaga(payload:any): any {
//     const {id} = payload?.payload
//     console.log(id)
//     try {
//         const response: any = yield call(api.get, `/aimodals/${id}`);
//         yield put (
//             fetchAiSuccess({
//                 ai: response.data  
//             })
//         );
//     } catch (e: any) {
//         yield put(
//             fetchAiFailure({
//                 error: e.message
//             })
//         );
//         console.error(e)
//     }
// }
// // post ai
// function* fetchPostAiSaga(prompt:any):any {
//     try {
//         const response: any = yield call
//         (postAi,prompt.prompt);
//         yield put(
//             postAiSuccess({
//                 ai: response.data
//             })
//         );
//     } catch (e: any) {
//         yield put(
//             postAiFailure({
//                 error: e.message
//             })
//         );
//     }
// }

// function* AiSaga() {
//     // yield all([takeLatest(FETCH_AI_REQUEST, fetchAiSaga)]);
//     yield all([takeLatest(FETCH_POST_AI_REQUEST, fetchPostAiSaga)]);
// }

// export default AiSaga;

