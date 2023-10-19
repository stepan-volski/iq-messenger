import { Message } from 'src/app/models/Message';

export interface State {
  chatBackgroundUrl: string;
  messageWithContextMenu: Message | null;
  messages: Message[];
}

export const initialState: State = {
  chatBackgroundUrl: '../../../assets/chat-bg.svg',
  messageWithContextMenu: null,
  messages: [],
};
