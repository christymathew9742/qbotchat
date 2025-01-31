import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

const getPending = (state: RootState) => state?.userReducer;
const getUser = (state: RootState) => state?.userReducer;
const getError = (state: RootState) => state?.userReducer;

export const getUserSelector = createSelector(getUser, (user:any) => user)
export const getPendingSelector = createSelector(getPending,(pending:any) => pending);
export const getErrorSelector = createSelector(getError, (error:any) => error);