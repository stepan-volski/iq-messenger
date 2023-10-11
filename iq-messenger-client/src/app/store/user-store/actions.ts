import { createActionGroup, props } from '@ngrx/store';

export const UserStoreActions = createActionGroup({
  source: 'User',
  events: {
    'Set Current User': props<{ currentUser: string }>(),
  },
});

// export function setCurrentUser(arg0: { currentUser: any; }): any {
//   throw new Error('Function not implemented.');
// }
