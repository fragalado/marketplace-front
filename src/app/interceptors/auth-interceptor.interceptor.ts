import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si recibimos un 401 (token caducado o no autorizado)
        if (error.status === 401) {
          // Comprobamos si tenemos refresh token
          const refreshToken = localStorage.getItem("refresh_token");
          if (refreshToken != null) {
            authService.refreshToken(refreshToken);
          } else {
            authService.logout();
          }
        }
        if (error.status === 403) {
          // Llamamos al logout si el token está caducado
          //authService.logout();
          // Redirigimos a la página 403
          router.navigateByUrl('/403');
        }
        // Re-emitimos el error para que otros interceptores puedan manejarlo si es necesario
        return throwError(() => error);;
      })
    );
  } else {
    return next(req);
  }
}