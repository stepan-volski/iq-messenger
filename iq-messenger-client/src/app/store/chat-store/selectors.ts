import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';

export const selectChatState = createFeatureSelector<State>('chat');

export const selectMessageWithContextMenu = createSelector(
  selectChatState,
  (state) => state.messageWithContextMenu
);
