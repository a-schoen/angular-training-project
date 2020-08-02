import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

declare var firebase: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean;

  constructor(
    private router: Router
  ) {
    this.trackLoginStatus();
  }

  createUser(userEmail: string, userPassword: string) {
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(() => {
      this.router.navigate(['/']);
    }).catch(err => console.log(err));
  }

  loginUser(userEmail: string, userPassword: string) {
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(() => {
      this.router.navigate(['/']);
    }).catch(err => console.error(err));
  }

  logoutUser() {
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }

  trackLoginStatus() {
    const loginState = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        loginState.next(true);
      } else {
        loginState.next(false);
      }
    });
    return loginState.asObservable();
  }

}