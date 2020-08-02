import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../entry.model';
import { Subscription } from 'rxjs';
import { EntryDataService } from '../entry-data.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-single-entry',
  templateUrl: './single-entry.component.html',
  styleUrls: ['./single-entry.component.scss']
})
export class SingleEntryComponent implements OnInit, OnDestroy {
  currentEntry: Entry = {
    type: '',
    link: '',
    title: '',
    imageUrl: '',
    content: ''
  };
  currentEntryId: string;
  isLoggedIn: boolean = false;
  getEntrySubscription: Subscription;
  loginStatusSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: EntryDataService,
    public userService: UserService
  ) { }

  ngOnInit(): void {   
    this.getEntry();
    this.checkLoginStatus();
  }

  ngOnDestroy(): void {
    this.getEntrySubscription.unsubscribe();
    this.loginStatusSubscription.unsubscribe();
  }

  //toDo: get rid of the repetition & do this globally/in parent component
  checkLoginStatus(): void {
    this.loginStatusSubscription = this.userService.trackLoginStatus().subscribe(
      loginStatus => { this.isLoggedIn = loginStatus; },
      err => { console.error(err) }
    );
  }

  getEntry(): void {
    this.getEntrySubscription = this.activatedRoute.params.subscribe(params => {
      this.currentEntryId = params['id'];
      
      //toDo: find different solution without use of nested subscriptions
      this.dataService.getEntry(this.currentEntryId).subscribe(
        data => { this.currentEntry = data; },
        error => {
          console.error(error);
          this.router.navigate(['/entries']);
        }
      );
    });
  }

  onDelete(): void {
    this.dataService.deleteEntry(this.currentEntryId).subscribe(
      () => { this.router.navigate(['/entries']) },
      err => { console.error(err) }
    );
  }
}
