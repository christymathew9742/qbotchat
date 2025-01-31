import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

const getPending = (state: RootState) => state?.aboutReducer;
const getcategory = (state: RootState) => state?.aboutReducer;
const getError = (state: RootState) => state?.aboutReducer;

export const getAboutSelector = createSelector(getcategory, (about:any) => about)
export const getPendingSelector = createSelector(getPending,(pending:any) => pending);
export const getErrorSelector = createSelector(getError, (error:any) => error);