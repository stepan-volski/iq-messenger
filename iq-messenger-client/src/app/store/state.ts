import { ChatStoreState } from './chat-store';
import { UserStoreState } from './user-store';


export interface State {
  user: UserStoreState.State;
  chat: ChatStoreState.State;
}
