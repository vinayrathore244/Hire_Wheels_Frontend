import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string;
  hasUserloggedIn = new BehaviorSubject<boolean>(false);
  userData = new BehaviorSubject<User>(new User());
  askToSignIn = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.baseURL = 'http://localhost:8012/';
  }

  registerUser(userdetails: User) {
    return this.http.post(this.baseURL + 'users', userdetails)
      .pipe(map(response => {
        return response;
      }));
  }

  loginUser(user) {
    return this.http.post(this.baseURL + 'users/access-token', user)
      .pipe(map((response: any) => {
        if (response) {
          localStorage.setItem('authResponse', JSON.stringify(response));
          this.setUserDetails();
        }
        return response;
      }));
  }

  resetPassword(user) {
    return this.http.put(this.baseURL + 'users/access-token/password', user)
      .pipe(map(response => {
        return response;
      }));
  }

  setUserDetails() {
    const response = JSON.parse(localStorage.getItem('authResponse'));
    if (response) {
      const userDetails = new User();
      userDetails.firstName = response.firstName;
      userDetails.userId = response.userId;
      userDetails.walletMoney = response.walletMoney;
      userDetails.roleName = response.roleName;

      this.userData.next(userDetails);
      this.hasUserloggedIn.next(true);
    }
  }

  logout() {
    localStorage.clear();
    this.userData.next(new User());
    this.hasUserloggedIn.next(false);
  }

  fetchToken(): string {
    if (localStorage.getItem('authResponse')) {
      return JSON.parse(localStorage.getItem('authResponse')).jwtToken;
    }
  }
}
