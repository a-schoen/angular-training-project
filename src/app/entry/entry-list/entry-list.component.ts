import { Component, OnInit, OnDestroy } from '@angular/core';
import { Entry } from '../entry.model';
import { EntryDataService } from '../entry-data.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],

})
export class EntryListComponent implements OnInit, OnDestroy {

  entries: Entry[];
  getEntriesSubscription: Subscription;
  loginStatusSubscription: Subscription;
  isLoggedIn: boolean = false;
  
  constructor(
    private dataService: EntryDataService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getEntries();
    this.checkLoginStatus();
  }

  ngOnDestroy(): void {
    this.getEntriesSubscription.unsubscribe();
    this.loginStatusSubscription.unsubscribe();
  }

  //toDo: get rid of the repetition & do this globally/in parent component
  checkLoginStatus(): void {
    this.loginStatusSubscription = this.userService.trackLoginStatus().subscribe(
      loginStatus => { this.isLoggedIn = loginStatus; },
      err => { console.error(err) }
    );
  }

  getEntries(): void {
    this.getEntriesSubscription = this.dataService.getAllEntries().subscribe(
      data => { this.entries = data; },
      err => { console.error(err)}
    );   
  }
}
