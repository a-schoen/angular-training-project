import { createReducer, on } from '@ngrx/store';
import { updateUserStatusDone, authError } from './user.actions';

const initialState = {userLoggedIn: false, loginErrorMsg: ''}

export const userStatusReducer = createReducer<object>(
  initialState,
  on(updateUserStatusDone, (state, action) => {
    return { userLoggedIn: action.userLoggedIn, loginErrorMsg: ''};
  }),
  on(authError, (state, action) => {
    return { userLoggedIn: action.userLoggedIn, loginErrorMsg: action.loginErrorMsg};
  })
);