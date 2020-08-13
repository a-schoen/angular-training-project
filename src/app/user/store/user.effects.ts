import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../user.service';
import { updateUserStatusRequest, updateUserStatusDone, logoutUserRequest, loginUserRequest, createUserRequest, authError } from './user.actions';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects implements OnInitEffects {

  constructor(
    private router: Router,
    private userService: UserService,
    private actions$: Actions
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: '[User] Update User Status Request' };
  }

  updateUserStatus$ = createEffect(() => this.actions$.pipe(
    ofType(updateUserStatusRequest),
    switchMap(() => this.userService.trackLoginStatus().pipe(
      map(status => {
        return updateUserStatusDone({ userLoggedIn: status, loginErrorMsg: '' })
      })
    ))
  ));

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(createUserRequest),
    switchMap((action) => this.userService.createUser(action.userEmail, action.userPassword).pipe(
      map(() => {
        this.router.navigate(['/']);
        return updateUserStatusRequest();
      }),
      catchError(err => of(authError({ userLoggedIn: false, loginErrorMsg: err.message })))
    ))
  ));

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(loginUserRequest),
    switchMap((action) => this.userService.loginUser(action.userEmail, action.userPassword).pipe(
      map(() => {
        this.router.navigate(['/']);
        return updateUserStatusRequest();
      }),
      catchError(err => of(authError({ userLoggedIn: false, loginErrorMsg: err.message })))
    ))
  ));

  logoutUser$ = createEffect(() => this.actions$.pipe(
    ofType(logoutUserRequest),
    switchMap(() => this.userService.logoutUser().pipe(
      map(() => {
        this.router.navigate(['/']);
        return updateUserStatusRequest();
      })
    ))
  ));

}