import { createReducer, on } from "@ngrx/store";
import { initialState } from "./state";
import { ChatStoreActions } from "./actions";

export const featureReducer = createReducer(
  initialState,
  on(ChatStoreActions.setChatBackground, (state, { chatBackgroundUrl }) => ({
    ...state,
    chatBackgroundUrl
  })),
  on(ChatStoreActions.toggleMessageContextMenu, (state, { messageWithContextMenu }) => ({
    ...state,
    messageWithContextMenu
  }))
)
