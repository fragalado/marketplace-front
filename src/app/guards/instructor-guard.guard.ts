import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const instructorGuardGuard: CanActivateFn = (route, state) => {
  // Inyectamos router
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');

  if (token) {
    const decodedToken = parseJwt(token);
    if (decodedToken.role == 'INSTRUCTOR') {
      return true;
    }
  }
  router.navigateByUrl('/');
  return false;
};

function parseJwt(token: string): any {
  const base64Payload = token.split('.')[1]; // El segundo segmento es el payload
  const payload = atob(base64Payload); // Decodifica Base64
  return JSON.parse(payload); // Convierte a objeto
}