import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../entry.model';
import { Subscription, Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { RssFetchService } from '../services/rss-fetch.service';
import { AppState } from '../../app.state';
import { Store, select } from '@ngrx/store';
import { deleteEntryRequest } from '../store/entry.actions'; 

@Component({
  selector: 'app-single-entry',
  templateUrl: './single-entry.component.html',
  styleUrls: ['./single-entry.component.scss']
})
export class SingleEntryComponent implements OnInit, OnDestroy {
  currentEntry: Entry;
  entries$: Observable<Entry[]> = this.store.pipe(select(state => state.entries));
  currentEntryId: string;
  isLoggedIn: boolean;
  loginStatus$: Observable<boolean> = this.store.select(state => state.loginStatus.userLoggedIn);
  getEntrySubscription: Subscription;
  loginStatusSubscription: Subscription;
  feedServiceSubscription: Subscription;
  isLoaded: boolean = false;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rssService: RssFetchService,
    public userService: UserService 
  ) { 
  }

  ngOnInit(): void {   
    this.currentEntryId = this.activatedRoute.snapshot.params['id'];
    this.getEntry();
    this.checkLoginStatus();
  }

  ngOnDestroy(): void {
    this.getEntrySubscription.unsubscribe();
    if(this.feedServiceSubscription) {
      this.feedServiceSubscription.unsubscribe();
    }
    this.loginStatusSubscription.unsubscribe();
  }

  checkLoginStatus(): void {
    this.loginStatusSubscription = this.loginStatus$.subscribe(
      loginStatus => { this.isLoggedIn = loginStatus; },
      err => { console.error(err) }
    );
  }

  getEntry(): void {
    this.getEntrySubscription = this.entries$.subscribe(
      entries => {
        const filtered = [...entries].filter((entry) => {
          return entry.id === this.currentEntryId;
        });
        this.currentEntry = filtered[0];
        this.loadContent();
      },
      error => {
        console.error(error);
        this.router.navigate(['/entries']);
      }
    );
  }

  onDelete(): void {
    if(confirm('Are you sure you want to delete this entry?')){
      this.isLoaded = false;
      this.store.dispatch(deleteEntryRequest({'entryId': this.currentEntryId}));
      this.router.navigate(['/entries']);
    }
  }

  loadContent() {
    if(this.currentEntry) {
      switch(this.currentEntry.type){
        case 'rss':
          console.log('loading rss');
          this.feedServiceSubscription = this.rssService.parseFeed(this.currentEntry).subscribe(
            newEntry => { 
              this.currentEntry = newEntry 
              this.isLoaded = true;
            },
            err => console.error(err)
          );
          break;
        case 'twitter':
          console.log('loading tweets');  
          this.feedServiceSubscription = this.rssService.parseFeed(this.currentEntry).subscribe(
            tweets => { 
              // todo: show tweets
              console.log('loaded tweets: ', tweets);
            },
            err => console.error(err)
          );
        // toDo: other entry types  
        default:
          this.isLoaded = true;
      }    
    }
  }

}
