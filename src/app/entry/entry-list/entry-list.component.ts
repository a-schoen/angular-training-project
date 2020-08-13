import { Component, OnInit, OnDestroy } from '@angular/core';
import { Entry } from '../entry.model';
import { Subscription, Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { AppState } from '../../app.state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],

})
export class EntryListComponent implements OnInit, OnDestroy {

  entries: Entry[];
  isLoaded: boolean = false;
  getEntriesSubscription: Subscription;
  loginStatusSubscription: Subscription;
  isLoggedIn: boolean;
  loginStatus$: Observable<boolean> = this.store.select(state => state.loginStatus.userLoggedIn);
  
  constructor(
    private store: Store<AppState>,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.getEntries();
  }

  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
    this.getEntriesSubscription.unsubscribe();
  }

  checkLoginStatus(): void {
    this.loginStatusSubscription = this.loginStatus$.subscribe(
      loginStatus => { this.isLoggedIn = loginStatus; },
      err => { console.error(err) }
    );
  }

  getEntries(): void {
    this.getEntriesSubscription = this.store.pipe(select(state => state.entries)).subscribe(
      entries => {
        this.entries = [...entries];
        this.isLoaded = true;
      },
      err => { console.error(err) }
    );
  }
}
