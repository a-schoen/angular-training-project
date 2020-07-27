import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { entryRouting } from './entry.routing';
import { EntryComponent } from './entry.component';
import { SingleEntryComponent } from './single-entry/single-entry.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryEditComponent } from './entry-edit/entry-edit.component';

@NgModule({
  declarations: [
    SingleEntryComponent, 
    EntryListComponent, 
    EntryEditComponent, EntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    entryRouting
  ]
})
export class EntryModule { }
