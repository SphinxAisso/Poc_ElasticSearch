import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from '../services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    env = environment;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private authenticationService: AuthenticationService) {
        this.env.isLoggedIn = false;
        this.env.goBack = false;
        document.body.className = "page page-home page-contact login-page"; 
    }

    ngOnInit() {
        this.titleService.setTitle( "Login - ZSoft Mobile Coverage" );
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        if( this.authenticationService.login(this.f.username.value, this.f.password.value) ){
            this.router.navigate([this.returnUrl]);
        }else{
            this.error = 'Username or password is incorrect';
            this.loading = false;
        }
    }
}
