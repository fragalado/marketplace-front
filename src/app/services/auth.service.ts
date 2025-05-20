import { Injectable, signal } from '@angular/core';
import { User, UserRegisterDto } from '../models/user';
import { AuthResponse, LoginRequest } from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible a nivel global
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth'; // URL base para las peticiones de autenticación
  private readonly TOKEN_KEY = 'auth_token'; // Clave para guardar el token JWT en localStorage

  // Signal reactivo para almacenar el usuario actual autenticado
  currentUser = signal<User | null>(null);

  // Signal para indicar si hay un usuario autenticado
  isLoggedIn = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    // Si hay un token guardado, se asume que el usuario está logueado
    const token = this.getToken();
    if (token) {
      this.isLoggedIn.set(true);
      // No se hace getUser aquí para evitar peticiones innecesarias
    }
  }

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * Guarda el token recibido y recupera el perfil del usuario.
   */
  login(credentials: LoginRequest, rememberMe: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => this.handleAuthResponse(response, rememberMe)),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Registra un nuevo usuario y realiza login automático si el registro fue exitoso.
   */
  register(userData: UserRegisterDto, rememberMe: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => this.handleAuthResponse(response, rememberMe)),
        catchError(error => {
          console.error('Registration failed:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Maneja la lógica compartida tras un login o registro exitoso.
   */
  private handleAuthResponse(response: AuthResponse, rememberMe: boolean): void {
    this.storeToken(response.accessToken);
    if (rememberMe) {
      localStorage.setItem("refresh_token", response.refreshToken);
    }
    this.isLoggedIn.set(true);
    this.getUser();
  }

  /**
   * Solicita un nuevo access token usando el refresh token.
   */
  refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken })
      .pipe(
        tap(response => {
          this.storeToken(response.accessToken);
          localStorage.setItem("refresh_token", response.refreshToken);
        })
      );
  }

  /**
   * Cierra la sesión del usuario eliminando los tokens y redirigiendo a login.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('refresh_token');
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigateByUrl("/login");
  }

  /**
   * Guarda el access token en localStorage.
   */
  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Devuelve el access token actual desde localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Recupera los datos del perfil del usuario autenticado desde el backend.
   */
  getUser(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.currentUser.set(data);
      },
      error: (error) => {
        console.error('AuthService - Error fetching user profile:', error);
      }
    });
  }
}
