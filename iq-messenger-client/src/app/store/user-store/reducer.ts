import { createReducer, on } from "@ngrx/store";
import { initialState } from "./state";
import { UserStoreActions } from "./actions";

export const featureReducer = createReducer(
  initialState,
  on(UserStoreActions.setCurrentUser, (state, { currentUser }) => ({
    ...state,
    currentUser
  }))
)
