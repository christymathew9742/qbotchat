import { combineReducers } from 'redux';

import aboutReducer from './reducers/about/reducer'
import userReducer from './reducers/user/reducer'
import aiReducer from './reducers/aimodal/reducer'
import botReducer from './reducers/chatBot/reducer'

const rootReducer = combineReducers({
    aboutReducer,
    userReducer,
    aiReducer,
    botReducer,
});
  
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;