import { createActionGroup, props } from '@ngrx/store';
import { Message } from 'src/app/models/Message';

export const ChatStoreActions = createActionGroup({
  source: 'Chat',
  events: {
    'Set Chat Background': props<{ chatBackgroundUrl: string }>(),
    'Toggle Message Context Menu': props<{
      messageWithContextMenu: Message | null;
    }>(),
    Init: props<{ username: string }>(),
    'Post Message': props<{ message: Message }>(),
    'Print Messages': props<{ messages: Message[] }>(),
    'Add Printed Message': props<{ message: Message }>(),
    'Delete Message': props<{ messageId: string }>(),
    'Delete Printed Message': props<{ messageId: string }>(),
  },
});

