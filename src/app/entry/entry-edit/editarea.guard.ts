import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Injectable()
export class EditAreaGuard implements CanActivate {

  isLoggedIn$: Observable<boolean> = this.store.select(state => state.loginStatus.userLoggedIn);

  constructor(
    private store: Store<AppState>,
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLoggedIn$.pipe(first());
  }

}