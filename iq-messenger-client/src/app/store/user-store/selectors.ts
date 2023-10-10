import { createSelector } from '@ngrx/store';
import { State } from '../state';

export const selectUserState = (state: State) => state.user;

export const selectCurrentUserName = createSelector(
  selectUserState,
  (state) => state.currentUser
);
