import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, from } from 'rxjs';

declare var firebase: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router
  ) { }

  createUser(userEmail: string, userPassword: string) {
    return from(firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword));
  }

  loginUser(userEmail: string, userPassword: string): Observable<any> {
    return from(firebase.auth().signInWithEmailAndPassword(userEmail, userPassword));
  }

  logoutUser() {
    return from(firebase.auth().signOut());
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