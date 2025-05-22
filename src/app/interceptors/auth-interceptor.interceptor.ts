import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');

  const isRefreshRequest = req.url.includes('/refresh');

  // No añadir el token a la petición de refresh
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
        // Si incluso el refresh falla, cerramos sesión
        authService.logout();
        return throwError(() => error);
      }

      if (error.status === 401) {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((data) => {
              // Ya está guardado dentro de refreshToken()
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${data.accessToken}`
                }
              });
              return next(newReq);
            }),
            catchError((refreshError) => {
              console.error("Error al refrescar token:", refreshError);
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        } else {
          authService.logout();
        }
      }

      if (error.status === 403) {
        router.navigateByUrl('/403');
      }

      return throwError(() => error);
    })
  );
}