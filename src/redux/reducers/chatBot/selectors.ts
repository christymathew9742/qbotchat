import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

const getBotState = (state: RootState) => state?.botReducer;
const getWebSocketStatus = (state: RootState) => state?.botReducer?.webSocketStatus;
const getBot = (state: RootState) => state?.botReducer?.bot;
const getError = (state: RootState) => state?.botReducer?.error;
const getPending = (state: RootState) => state?.botReducer?.pending;

export const getBotSelector = createSelector(getBot, (bot: any) => bot);
export const getPendingSelector = createSelector(getPending, (pending: any) => pending);
export const getErrorSelector = createSelector(getError, (error: any) => error);

// New selector for WebSocket status
export const getWebSocketStatusSelector = createSelector(
  getWebSocketStatus,
  (webSocketStatus: string) => webSocketStatus
);
