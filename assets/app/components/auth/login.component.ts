import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../user/user.model";
import { AuthService } from "./auth.service";

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {
        authService.logout();
    }
    onSubmit() {
        const user = new User(
            this.myForm.value.username, this.myForm.value.password,
            '',
            0,
            ''
        );
        this.authService.login(user)
            .subscribe(
                data => {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem('username', data.user.username);
                    localStorage.setItem('fullname', data.user.fullname);
                    localStorage.setItem("studentid", data.user.studentid);
                    localStorage.setItem("user",JSON.stringify(data.user));
                    this.router.navigateByUrl('/home');
                },
                error => console.error(error)
            );
        this.myForm.reset();
    }
    ngOnInit() {
        this.myForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }
}