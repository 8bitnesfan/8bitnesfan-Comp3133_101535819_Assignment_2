import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://comp3133-101535819-assignment-1.onrender.com/graphql';
  private tokenKey = 'auth_token';
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));

  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const query = `
      query {
        login(email: "${email}", password: "${password}") {
          token
          user {
            id
            username
            email
          }
        }
      }
    `;

    return this.http.post<any>(this.url, { query }).pipe(
      map(res => {
        const token = res.data.login?.token;
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          this._isLoggedIn.next(true);
        }
        return res.data.login;
      })
    );
  }

  signup(username: string, email: string, password: string) {
    const query = `
      mutation {
        signup(input: {
          username: "${username}",
          email: "${email}",
          password: "${password}"
        }) {
          id
          username
          email
        }
      }
    `;
    return this.http.post<any>(this.url, { query }).pipe(
      map(res => res.data.signup)
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn.next(false);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
