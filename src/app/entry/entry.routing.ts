import { Routes, RouterModule } from '@angular/router';
import { SingleEntryComponent } from './single-entry/single-entry.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryEditComponent } from './entry-edit/entry-edit.component';

const ENTRY_ROUTES: Routes = [
  { path: '', component: EntryListComponent },
  { path: 'entry/:id', component: SingleEntryComponent },
  { path: 'entry/:id/edit', component: EntryEditComponent }
];

export const entryRouting = RouterModule.forChild(ENTRY_ROUTES);
