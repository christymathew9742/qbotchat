import { all, fork } from 'redux-saga/effects';
import AboutSaga from './reducers/about/sagas';
import UserSagaa from './reducers/user/sagas';
import AiSagaa from './reducers/aimodal/sagas';
import BotSaga from './reducers/chatBot/sagas';

export function* rootSaga() {
    yield all([fork(AboutSaga)]);
    yield all([fork(UserSagaa)]);
    yield all([fork(AiSagaa)]);
    yield all([fork(BotSaga)]);
}