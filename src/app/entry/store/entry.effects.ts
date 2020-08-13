import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, OnInitEffects } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { EntryDataService } from '../services/entry-data.service';
import {
  createEntryRequest,
  updateEntryRequest,
  deleteEntryRequest,
  refreshEntriesRequest,
  refreshEntriesDone
} from './entry.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class EntryEffects implements OnInitEffects {

  constructor(
    private dataService: EntryDataService,
    private actions$: Actions
  ) { }

  ngrxOnInitEffects(): Action {
    return { type: '[Entry] Refresh Entries Request' };
  }

  refreshEntries$ = createEffect(() => this.actions$.pipe(
      ofType(refreshEntriesRequest),
      switchMap(() => this.dataService.getAllEntries().pipe(
        map(entries => {
          return refreshEntriesDone({ entries })
        })
      ))
    ),
  );

  createEntry$ = createEffect(() => this.actions$.pipe(
    ofType(createEntryRequest),
    switchMap((action) => this.dataService.createEntry(action.entry).pipe(
      map(() => {
        return refreshEntriesRequest()
      })
    ))
  ));

  updateEntry$ = createEffect(() => this.actions$.pipe(
    ofType(updateEntryRequest),
    switchMap((action) => this.dataService.updateEntry(action.entry).pipe(
      map(() => refreshEntriesRequest())
    ))
  ));

  deleteEntry$ = createEffect(() => this.actions$.pipe(
    ofType(deleteEntryRequest),
    switchMap((action) => this.dataService.deleteEntry(action.entryId).pipe(
      map(() => refreshEntriesRequest())
    ))
  ));

}