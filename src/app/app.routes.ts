import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

// Función para proteger rutas
const isAuthenticated = () => {
    const authService = inject(AuthService);
    return authService.isLoggedIn() ? true : { path: '/login' };
};

// Función para redirigir a los usuarios ya autenticados
const isNotAuthenticated = () => {
    const authService = inject(AuthService);
    return !authService.isLoggedIn() ? true : { path: '/' };
};

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'Inicio - Premium Learning'
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
        title: 'Contacto - Premium Learning'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
        canActivate: [isNotAuthenticated],
        title: 'Iniciar Sesión - Premium Learning'
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent),
        canActivate: [isNotAuthenticated],
        title: 'Registrarse - Premium Learning'
    },
    {
        path: 'courses',
        loadComponent: () => import('./pages/courses/course-list/course-list.component').then(m => m.CourseListComponent),
        title: 'Cursos - Premium Learning'
    },
    {
        path: 'courses/:id',
        loadComponent: () => import('./pages/courses/course-detail/course-detail.component').then(m => m.CourseDetailComponent),
        title: 'Detalles del Curso - Premium Learning'
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [isAuthenticated],
        title: 'Mi Perfil - Premium Learning'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
