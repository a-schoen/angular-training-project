import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  //toDo: get rid of the repetition & do this globally/in parent component
  checkLoginStatus(): void {
    this.userService.trackLoginStatus().subscribe(
      loginStatus => { this.isLoggedIn = loginStatus; },
      err => { console.error(err) }
    );
  }

  onLogout(): void {
    this.userService.logoutUser();
  }
}
