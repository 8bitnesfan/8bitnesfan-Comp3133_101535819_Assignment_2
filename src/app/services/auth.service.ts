import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    if (email && password) {
      this.isLoggedIn = true;
      localStorage.setItem('token', 'demo-token');
      this.router.navigate(['/employees']);
    }
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
