import { Routes } from '@angular/router';
import { userAuthenticatedGuard } from './guards/user-authenticated.guard';
import { userNotAuthenticatedGuard } from './guards/user-not-authenticated.guard';

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
        canActivate: [userNotAuthenticatedGuard],
        title: 'Iniciar Sesión - Premium Learning'
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent),
        canActivate: [userNotAuthenticatedGuard],
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
        canActivate: [userAuthenticatedGuard],
        title: 'Mi Perfil - Premium Learning'
    },
    {
        path: 'admin-courses',
        loadComponent: () => import('./pages/profile/admin-courses/admin-courses.component').then(m => m.AdminCoursesComponent),
        canActivate: [userAuthenticatedGuard],
        title: 'Administrar Cursos - Premium Learning'
    },
    {
        path: 'admin-courses/create-course',
        loadComponent: () => import('./pages/profile/admin-courses/create-course/create-course.component').then(m => m.CreateCourseComponent),
        canActivate: [userAuthenticatedGuard],
        title: 'Administrar Cursos - Premium Learning'
    },
    {
        path: 'admin-courses/edit-course/:id',
        loadComponent: () => import('./pages/profile/admin-courses/modify-course/modify-course.component').then(m => m.ModifyCourseComponent),
        canActivate: [userAuthenticatedGuard],
        title: 'Administrar Cursos - Premium Learning'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
