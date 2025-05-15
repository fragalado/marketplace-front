import { Injectable, signal } from '@angular/core';
import { User, UserRegisterRequest } from '../models/user';
import { AuthResponse, LoginRequest } from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserService } from './user.service';
import { UserCourse } from '../models/course';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'auth_token';

  // Signal para el usuario actual
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    const token = this.getToken();
    if (token) {
      this.isLoggedIn.set(true);
      //this.getUser(); // recupera los datos del usuario tras recarga
    }
  }

  login(credentials: LoginRequest, rememberMe: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Recibimos el access token
          this.storeToken(response.accessToken);
          // Guardamos el refresh token si rememberMe es true
          if (rememberMe) localStorage.setItem("refresh_token", response.refreshToken);
          this.isLoggedIn.set(true);
          this.getUser();
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  register(userData: UserRegisterRequest, rememberMe: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          // Recibimos el access token
          this.storeToken(response.accessToken);
          // Guardamos el refresh token si rememberMe es true
          if (rememberMe) localStorage.setItem("refresh_token", response.refreshToken);
          this.isLoggedIn.set(true);
          this.getUser();
        }),
        catchError(error => {
          console.error('Registration failed:', error);
          return throwError(() => error);
        })
      );
  }

  refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { 'refreshToken': refreshToken })
      .pipe(
        tap(response => {
          // Recibimos el access token
          this.storeToken(response.accessToken);
          // Guardamos el refresh token si rememberMe es true
          localStorage.setItem("refresh_token", response.refreshToken);
        }));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('refresh_token');
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigateByUrl("/login");
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        let userC = data;
        let user = {
          uuid: userC.uuid,
          username: userC.username,
          firstName: userC.firstName,
          lastName: userC.lastName,
          bio: userC.bio,
          profilePicture: userC.profilePicture,
          email: userC.email,
          role: userC.role as "STUDENT" | "INSTRUCTOR" | "ADMIN",
          createdAt: userC.created_at,
          updatedAt: userC.updated_at
        }
        this.currentUser.set(user);
      },
      error: (error) => {
        console.error('AuthService - Error fetching user profile:', error);
      }
    });
  }
}
