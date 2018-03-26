import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from "@angular/router";

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html'
 })
export class HeaderComponent {
    constructor(private _authservice: AuthService, private router: Router){

    }
    isLoggedIn(){
        return this._authservice.isLoggedIn();
    }
    dologout(){
        this._authservice.logout();
        this.router.navigateByUrl('/login');
    }
 }
