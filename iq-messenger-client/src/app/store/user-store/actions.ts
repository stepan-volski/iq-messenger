import { createActionGroup, props } from '@ngrx/store';

export const UserStoreActions = createActionGroup({
  source: 'User',
  events: {
    'Set Current User': props<{ currentUser: string }>(),
  },
});
