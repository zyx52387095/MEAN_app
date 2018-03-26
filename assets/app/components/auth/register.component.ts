import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../user/user.model";
import { AuthService } from "./auth.service";


@Component({
    selector: 'register-component',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    myForm: FormGroup;
    message:string;

    constructor(private authService: AuthService, private router: Router) {

    }
    onSubmit() {
        const user = new User(
            this.myForm.value.username,
            this.myForm.value.password,
            this.myForm.value.email,
            this.myForm.value.studentid,
            this.myForm.value.fullname
        );
        this.authService.register(user)
            .subscribe(
                data => {
                    this.router.navigateByUrl('/login');
                },
                error =>this.message=error.message
            );
     }

    /* invoked once to initialize data */
    //makes form fields as part of group 
    ngOnInit() {
        this.myForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            studentid: new FormControl(null, Validators.required),
            fullname: new FormControl(null, Validators.required)
        });
    }

}