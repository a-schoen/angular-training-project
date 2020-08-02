import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EditAreaGuard implements CanActivate {

  constructor(
    private userService: UserService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.trackLoginStatus().pipe(first());
  }

}