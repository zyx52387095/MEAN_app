import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

/*
  Used for checking if the route can be active.  e.g do not allow /home unless logged in
*/
@Injectable()
export class RouteGuard implements CanActivate {

  constructor(private _authservice: AuthService) {}

  canActivate() {
    return this._authservice.isLoggedIn();
  }
}