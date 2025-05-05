import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'auth_token';

  // Signal para el usuario actual
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.storeToken(response.token);
          this.currentUser.set(response.user);
          this.isLoggedIn.set(true);
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, userData)
      .pipe(
        tap(response => {
          this.storeToken(response.token);
          this.currentUser.set(response.user);
          this.isLoggedIn.set(true);
        }),
        catchError(error => {
          console.error('Registration failed:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private loadToken(): void {
    const token = this.getToken();
    if (token) {
      // Cargar información del usuario (puedes hacer una petición al backend)
      this.isLoggedIn.set(true);
      this.fetchCurrentUser().subscribe();
    }
  }

  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/me`)
      .pipe(
        tap(user => {
          this.currentUser.set(user);
        }),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }
}
