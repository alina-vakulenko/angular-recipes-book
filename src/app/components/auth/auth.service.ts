import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, throwError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from './user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: ReturnType<typeof setTimeout>;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fbAPIKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) =>
          this.handleAuthResponse(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        )
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fbAPIKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) =>
          this.handleAuthResponse(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        )
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('recipeAppUserData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const storedData = localStorage.getItem('recipeAppUserData');
    if (!storedData) return;

    const { email, id, _token, _expDate } = JSON.parse(storedData);
    const persistedUser = new User(email, id, _token, new Date(_expDate));

    if (persistedUser.token) {
      this.user.next(persistedUser);
      const expirationDuration =
        new Date(persistedUser.expDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthResponse(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('recipeAppUserData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.message === 'INVALID_LOGIN_CREDENTIALS') {
      return throwError(() => new Error('Credentials are not correct'));
    }
    if (!errorRes.error?.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Credentials are not correct';
    }

    return throwError(() => new Error(errorMessage));
  }
}
