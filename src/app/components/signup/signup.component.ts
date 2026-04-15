import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup(this.username, this.email, this.password).subscribe({
      next: (res) => {
        console.log('Signup successful', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup failed', err);
        this.errorMessage = 'Signup failed, try again';
      }
    });
  }
}
