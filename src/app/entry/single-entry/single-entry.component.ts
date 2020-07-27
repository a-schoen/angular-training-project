import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../entry.model';
import { Subscription } from 'rxjs';
import { EntryDataService } from '../entry-data.service';

@Component({
  selector: 'app-single-entry',
  templateUrl: './single-entry.component.html',
  styleUrls: ['./single-entry.component.scss']
})
export class SingleEntryComponent implements OnInit {
  currentEntry: Entry;
  currentEntryId: number;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: EntryDataService
  ) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.currentEntryId = params['id'];
      this.currentEntry = this.dataService.getEntry(this.currentEntryId);
      console.log('current entry:', this.currentEntry);
      if(!this.currentEntry || typeof this.currentEntry === 'undefined'){
        console.log('nonexistent');
        this.router.navigate(['/entries']);
      }
    });

  }

}
