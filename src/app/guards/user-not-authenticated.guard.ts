import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const userNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  // Guard logic to check if the user is not authenticated
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigateByUrl('/');
    return false;
  } else {
    return true;
  }
};
