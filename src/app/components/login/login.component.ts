import { Component } from '@angular/core';
import { AuthService } from '/Users/HP/EmployeeFrontend/src/app/services/auth.service';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from '/Users/HP/EmployeeFrontend/src/app/auth.interceptor.spec'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule,
  FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        const decoded = this.authService.decodeToken();
        console.log('Logged in user:', decoded);
        this.router.navigate(['/employees']);
      },
      error: err => alert('Invalid credentials')
    });
  }
}
