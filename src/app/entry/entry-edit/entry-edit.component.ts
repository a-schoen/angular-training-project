import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Entry } from '../entry.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { createEntryRequest, updateEntryRequest } from '../store/entry.actions';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.scss']
})
export class EntryEditComponent implements OnInit, OnDestroy {

  getEntrySubscription: Subscription;
  saveEntrySubscription: Subscription;
  editForm: FormGroup;
  isAdd: boolean = true;
  isLoaded: boolean = false;
  pageTitle: string = 'Add New Entry';
  entries$: Observable<Entry[]>;
  currentEntryId: string;
  currentEntry: any = {
    id: this.currentEntryId,
    type: '',
    link: '',
    title: ''
  };
  selectedType: string; 

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const routeSnapshot = this.activatedRoute.snapshot
    this.currentEntryId = routeSnapshot.params['id'];
    this.entries$ = this.store.pipe(select(state => state.entries));
    
    if(routeSnapshot.routeConfig.path === 'entry/:id/edit'){
      this.isAdd = false;
      this.getEntry();
      this.pageTitle = "Edit Entry Details";
    } else {
      this.setForm();
    }
  }

  ngOnDestroy(): void {
    if(this.getEntrySubscription){
      this.getEntrySubscription.unsubscribe();
    }
  }

  getEntry() {
    this.getEntrySubscription = this.entries$.subscribe(
      entries => {
        const filtered = [...entries].filter((entry) => {
          return entry.id === this.currentEntryId;
        });
        this.currentEntry = filtered[0];
        this.setForm();
      },
      error => {
        console.error(error);
        this.router.navigate(['/entries']);
      }
    );
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

  onUpdateForm(): void {
    this.selectedType = this.editForm.value['type'];
    if(this.selectedType === 'twitter') {
      this.editForm.addControl('username', this.formBuilder.control(this.currentEntry.username ? this.currentEntry.username : '', Validators.required));
      this.editForm.addControl('count', this.formBuilder.control(this.currentEntry.count ? this.currentEntry.count : '', Validators.required));
    } else {
      this.editForm.get('link').setValidators(Validators.required);
    }
    // toDo: specify form for other entry types
  }

  onSaveEdit(): void {
    //todo: perhaps get form content via two way binding
    const newEntry: Entry = this.editForm.value;

    if(this.isAdd){
      newEntry.id = 'newEntryId';
      this.store.dispatch(createEntryRequest({entry: newEntry}));
      this.router.navigate(['entries']);
    } else {
      newEntry.id = this.currentEntryId;
      this.store.dispatch(updateEntryRequest({entry: newEntry }));
      this.router.navigate(['entries', 'entry', this.currentEntryId]);
    }
  }
}
