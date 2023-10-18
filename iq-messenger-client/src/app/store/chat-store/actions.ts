import { createActionGroup, props } from '@ngrx/store';
import { Message } from 'src/app/models/Message';

export const ChatStoreActions = createActionGroup({
  source: 'Chat',
  events: {
    'Set Chat Background': props<{ chatBackgroundUrl: string }>(),
    'Toggle Message Context Menu': props<{ messageWithContextMenu: Message | null }>(),
  },
});
