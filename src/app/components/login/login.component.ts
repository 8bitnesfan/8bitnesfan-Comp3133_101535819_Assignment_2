import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    // basic validation
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    // call the AuthService
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        if (!res?.token) {
          this.errorMessage = 'Invalid email or password';
          return;
        }

        console.log('Login successful', res);
        this.router.navigate(['/employees']); // navigate only on success
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
