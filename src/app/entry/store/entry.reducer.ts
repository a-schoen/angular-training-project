import { createReducer, on } from '@ngrx/store';
import { refreshEntriesDone } from './entry.actions';
import { Entry } from '../entry.model';

export const entryListReducer = createReducer<Entry[]>(
  [],
  on(refreshEntriesDone, (state, action) => {
    const newEntries = [];

    for(let key in action.entries) {
      const newEntry = { ...action.entries[key] };
      newEntry.id = key;
      newEntries.push(newEntry);
    }
    return newEntries;
  })  
);
