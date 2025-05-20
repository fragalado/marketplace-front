import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { provideHotToastConfig } from '@ngneat/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptorInterceptor])
    ),
    provideHotToastConfig({
      position: 'top-right',
      dismissible: true,
      duration: 4000,
      style: {
        background: '#ffffff',
        border: '1px solid #dee2e6',
        color: '#212529',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
        fontSize: '1rem',
        fontWeight: '500',
        fontFamily: 'system-ui, sans-serif'
      }
    }), // @ngneat/hot-toast provider
  ]
};
