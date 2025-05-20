import { Routes } from '@angular/router';
import { userAuthenticatedGuard } from './guards/user-authenticated.guard';
import { userNotAuthenticatedGuard } from './guards/user-not-authenticated.guard';
import { instructorGuardGuard } from './guards/instructor-guard.guard';

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
        path: 'my-courses',
        loadComponent: () => import('./pages/my-courses/my-courses.component').then(m => m.MyCoursesComponent),
        canActivate: [userAuthenticatedGuard],
        title: 'Mis cursos - Premium Learning'
    },
    {
        path: 'courses',
        loadComponent: () => import('./pages/courses/course-list/course-list.component').then(m => m.CourseListComponent),
        title: 'Cursos - Premium Learning'
    },
    {
        path: 'courses/:uuid',
        loadComponent: () => import('./pages/courses/course-detail/course-detail.component').then(m => m.CourseDetailComponent),
        title: 'Detalles del Curso - Premium Learning'
    },
    {
        path: 'lessons/:id',
        loadComponent: () => import('./pages/lessons/lesson-detail/lesson-detail.component').then(m => m.LessonDetailComponent),
        title: 'Detalles de la Leccion - Premium Learning'
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [userAuthenticatedGuard],
        title: 'Mi Perfil - Premium Learning'
    },
    {
        path: 'admin-courses',
        canActivate: [instructorGuardGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/profile/admin-courses/admin-courses.component').then(m => m.AdminCoursesComponent),
                title: 'Administrar Cursos - Premium Learning'
            },
            {
                path: 'create-course',
                loadComponent: () =>
                    import('./pages/profile/admin-courses/create-course/create-course.component').then(m => m.CreateCourseComponent),
                title: 'Crear Curso - Premium Learning'
            },
            {
                path: 'edit-course/:uuid',
                loadComponent: () =>
                    import('./pages/profile/admin-courses/modify-course/modify-course.component').then(m => m.ModifyCourseComponent),
                title: 'Editar Curso - Premium Learning'
            },
            {
                path: ':uuid/lessons',
                loadComponent: () =>
                    import('./pages/profile/admin-courses/admin-lessons/admin-lessons.component').then(m => m.AdminLessonsComponent),
                title: 'Lecciones del Curso - Premium Learning'
            },
            {
                path: ':uuid/lessons/create-lesson',
                loadComponent: () =>
                    import('./pages/profile/admin-courses/admin-lessons/create-lesson/create-lesson.component').then(m => m.CreateLessonComponent),
                title: 'Crear Lección - Premium Learning'
            },
            {
                path: ':uuid/lessons/:lessonUuid/edit',
                loadComponent: () =>
                    import('./pages/profile/admin-courses/admin-lessons/edit-lesson/edit-lesson.component').then(m => m.EditLessonComponent),
                title: 'Editar Lección - Premium Learning'
            }
        ]
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
        title: 'Carrito - Premium Learning'
    },
    {
        path: '403',
        loadComponent: () => import('./pages/error/forbidden/forbidden.component').then(m => m.ForbiddenComponent),
        title: 'Acceso Prohibido - Premium Learning'
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/error/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: 'Página no encontrada - Premium Learning'
    }
];
