import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');

  const isRefreshRequest = req.url.includes('/auth/refresh');

  const authReq = token && !isRefreshRequest
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (isRefreshRequest) {
        authService.logout();
        return throwError(() => error);
      }

      if (error.status === 401) {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken != null) {
          // ✅ Esperamos a que el refresh se complete y reintentamos la petición original
          return authService.refreshToken(refreshToken).pipe(
            switchMap((data) => {
              const newAccessToken = data.accessToken;
              localStorage.setItem("auth_token", newAccessToken);

              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              });

              return next(newRequest);
            }),
            catchError((refreshError) => {
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        } else {
          authService.logout();
        }
      }

      // 🔧 Aquí quitamos la redirección automática a /403
      // El componente que hizo la petición debe decidir qué hacer

      return throwError(() => error);
    })
  );
};