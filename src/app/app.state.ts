import { Entry } from './entry/entry.model';
import { UserStatus } from './user/user.status.model';

export interface AppState {
  entries: Entry[];
  loginStatus: UserStatus
}