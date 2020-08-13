import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { logoutUserRequest } from '../user/store/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginStatus$: Observable<boolean> = this.store.pipe(select(state => state.loginStatus.userLoggedIn));
  isLoggedIn: boolean;

  constructor(
    private store: Store<AppState>,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.loginStatus$.subscribe(
      loginStatus => { this.isLoggedIn = loginStatus; },
      err => { console.error(err) }
    );
  }

  onLogout(): void {
    this.store.dispatch(logoutUserRequest());
  }
}
