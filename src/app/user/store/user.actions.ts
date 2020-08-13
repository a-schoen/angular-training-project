import { createAction, props } from '@ngrx/store';
import { UserStatus } from '../user.status.model';

export const updateUserStatusRequest = createAction('[User] Update User Status Request');
export const updateUserStatusDone = createAction('[User] Update User Status Done', props<UserStatus>());
export const createUserRequest = createAction('[User] Create User Request', props<{ userEmail: string, userPassword: string }>());
export const loginUserRequest = createAction('[User] Login User Request', props<{ userEmail: string, userPassword: string }>());
export const logoutUserRequest = createAction('[User] Logout User Request');
export const authError = createAction('[User] Login Auth Error', props<UserStatus>());