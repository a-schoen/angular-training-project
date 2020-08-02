import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Entry } from '../entry.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntryDataService } from '../entry-data.service';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.scss']
})
export class EntryEditComponent implements OnInit, OnDestroy {

  getRouteSubscription: Subscription;
  getEntrySubscription: Subscription;
  saveEntrySubscription: Subscription;
  editForm: FormGroup;
  isAdd: boolean = true;
  isLoaded: boolean = false;
  pageTitle: string = 'Add New Entry';
  currentEntryId: string;
  currentEntry: any = {
    type: '',
    link: '',
    title: '',
    imageUrl: '',
    content: ''
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataService: EntryDataService
  ) { }

  ngOnInit(): void {
    this.getEntry();
  }

  ngOnDestroy(): void {
    this.getEntrySubscription.unsubscribe();
    this.getRouteSubscription.unsubscribe();
    if(this.saveEntrySubscription) {
      this.saveEntrySubscription.unsubscribe();
    }
  }

  getEntry(): void {
    this.getRouteSubscription = this.activatedRoute.params.subscribe(params => {
      if(params.hasOwnProperty('id')) {
        this.isAdd = false;
        this.pageTitle = "Edit Entry Details";
        this.currentEntryId = params['id'];
        
        //toDo: find different solution without use of nested subscriptions
        this.getEntrySubscription = this.dataService.getEntry(this.currentEntryId).subscribe(
          data => { 
            this.currentEntry = data; 
            this.setForm();
          },
          err => {
            console.error(err);
            this.router.navigate(['/entries']);
          }
        );
      }
      else {
        this.setForm();
      }
    });
  }

  setForm(): void {
    this.editForm = this.formBuilder.group({
      'title': this.formBuilder.control(this.currentEntry.title, Validators.required),
      'type': this.formBuilder.control(this.currentEntry.type, Validators.required),
      'link': this.formBuilder.control(this.currentEntry.link),
      'imageUrl': this.formBuilder.control(this.currentEntry.imageUrl),
      'content': this.formBuilder.control(this.currentEntry.content)
    });
    this.isLoaded = true;
  }

  onSaveEdit(): void {
    //todo: perhaps get form content via two way binding
    const newEntry: Entry = this.editForm.value;

    if(this.isAdd){
      this.saveEntrySubscription = this.dataService.createEntry(newEntry).subscribe(
        result => { this.router.navigate(['entries', 'entry', result.name]) },
        err => { console.error(err) }
      );
    } else {
      this.saveEntrySubscription = this.dataService.updateEntry(this.currentEntryId, newEntry).subscribe(
        data => { this.router.navigate(['entries', 'entry', this.currentEntryId]) },
        err => { console.error(err) }
      );
    }
    
  }
}
