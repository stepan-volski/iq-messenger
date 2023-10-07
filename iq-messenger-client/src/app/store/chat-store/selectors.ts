import { createFeatureSelector } from '@ngrx/store';
import { State } from './state';

export const selectChatState = createFeatureSelector<State>('chat');
