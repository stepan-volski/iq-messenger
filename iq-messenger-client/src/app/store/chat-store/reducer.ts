import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import { ChatStoreActions } from './actions';
import { state } from '@angular/animations';

export const featureReducer = createReducer(
  initialState,
  on(ChatStoreActions.setChatBackground, (state, { chatBackgroundUrl }) => ({
    ...state,
    chatBackgroundUrl,
  })),
  on(
    ChatStoreActions.toggleMessageContextMenu,
    (state, { messageWithContextMenu }) => ({
      ...state,
      messageWithContextMenu,
    })
  ),
  on(ChatStoreActions.addPrintedMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  })),
  on(ChatStoreActions.printMessages, (state, { messages }) => ({
    ...state,
    messages,
  })),
  on(ChatStoreActions.deletePrintedMessage, (state, { messageId }) => ({
    ...state,
    messages: [...state.messages].filter(
      (message) => message._id !== messageId
    ),
  }))
);
