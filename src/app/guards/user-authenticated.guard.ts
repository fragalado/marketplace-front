import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  // Guard logic to check if the user is authenticated
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
