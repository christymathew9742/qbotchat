import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

const getPending = (state: RootState) => state?.aiReducer;
const getAi = (state: RootState) => state?.aiReducer;
const getError = (state: RootState) => state?.aiReducer;

export const getAiSelector = createSelector(getAi, (ai:any) => ai)
export const getPendingSelector = createSelector(getPending,(pending:any) => pending);
export const getErrorSelector = createSelector(getError, (error:any) => error);