import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if the request is to the API
  if (req.url.includes('/api')) {
    // Clone the request and add the Authorization header
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`
      }
    });
    // Pass the cloned request instead of the original request to the next handler
    return next(clonedRequest);
  }

  // If the request is not to the API, just pass it to the next handler
  return next(req);
}