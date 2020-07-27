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
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.userService.logoutUser();
  }
}
