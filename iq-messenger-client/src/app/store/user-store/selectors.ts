import { createFeatureSelector } from '@ngrx/store';
import { State } from './state';

export const selectUserState = createFeatureSelector<State>('user');
