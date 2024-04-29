import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isLogin = false;
  isLoading = false;
  error: string | null = null;
  authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    this.isLoading = true;
    const { email, password } = this.authForm.value;

    let authObs: Observable<AuthResponse>;

    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      complete: () => {
        console.log('submitted');
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      },
    });

    this.authForm.reset();
  }
}
