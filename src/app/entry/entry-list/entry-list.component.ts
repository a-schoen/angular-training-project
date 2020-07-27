import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry.model';
import { EntryDataService } from '../entry-data.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],

})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(
    private dataService: EntryDataService
  ) { }

  ngOnInit() {
    this.getEntries();
  }

  getEntries() {
    this.entries = this.dataService.getAllEntries('');
  }
}
