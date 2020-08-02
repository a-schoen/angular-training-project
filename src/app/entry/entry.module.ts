import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { entryRouting } from './entry.routing';
import { EntryComponent } from './entry.component';
import { SingleEntryComponent } from './single-entry/single-entry.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryEditComponent } from './entry-edit/entry-edit.component';
import { EntryDataService } from './entry-data.service';
import { EditAreaGuard } from './entry-edit/editarea.guard';

@NgModule({
  declarations: [
    EntryComponent, 
    SingleEntryComponent, 
    EntryListComponent, 
    EntryEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    entryRouting
  ],
  providers: [
    EntryDataService,
    EditAreaGuard
  ]
})
export class EntryModule { }
