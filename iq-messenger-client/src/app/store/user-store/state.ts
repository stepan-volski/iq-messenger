export interface State {
  [x: string]: any;
  currentUser: string | null;
}

export const initialState: State = {
  currentUser: null,
};
