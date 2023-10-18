import { Message } from "src/app/models/Message";

export interface State {
  chatBackgroundUrl: string;
  messageWithContextMenu: Message | null;
}

export const initialState: State = {
  chatBackgroundUrl: '../../../assets/chat-bg.svg',
  messageWithContextMenu: null
}
