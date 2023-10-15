import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserStoreActions = createActionGroup({
  source: 'User',
  events: {
    'Set Current User': props<{ currentUser: string | null }>(),
    Login: props<{ username: string; password: string }>(),
    Register: props<{ username: string; password: string }>(),
    Logout: emptyProps(),
  },
});
