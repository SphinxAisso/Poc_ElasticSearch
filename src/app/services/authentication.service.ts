import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        if (username === "test" && password === "test") {
            // if login details are valid return user details
            let user = {
                username: "test",
                authdata: window.btoa(username + ':' + password)
            };
            // store user details and basic auth credentials in local storage 
            // to keep user logged in between page refreshes
            localStorage.setItem('UserSession', JSON.stringify(user));
            return user;
        } else {
            return false;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('UserSession');
    }
}