import { createAction, props } from '@ngrx/store';
import { Entry } from '../entry.model';

export const refreshEntriesRequest = createAction('[Entry] Refresh Entries Request');
export const refreshEntriesDone = createAction('[Entry] Refresh Entries Done', props<{ entries: Entry[] }>());
export const selectEntryRequest = createAction('[Entry] Select Entry Request', props<{ entryId: string }>());
export const createEntryRequest = createAction('[Entry] Create Entry Request', props<{ entry: Entry }>());
export const updateEntryRequest = createAction('[Entry] Update Entry Request', props<{ entry: Entry }>());
export const deleteEntryRequest = createAction('[Entry] Delete Entry Request', props<{ entryId: string }>());