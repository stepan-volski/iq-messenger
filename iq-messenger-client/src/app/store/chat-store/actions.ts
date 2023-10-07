import { createActionGroup, props } from '@ngrx/store';

export const ChatStoreActions = createActionGroup({
  source: 'Chat',
  events: {
    'Set Chat Background': props<{ backgroundUrl: string }>(),
  },
});
