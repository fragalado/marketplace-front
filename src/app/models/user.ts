export interface User {
    uuid: string;
    username: string;
    firstName: string;
    lastName: string;
    bio?: string;
    profilePicture?: string;
    email: string;
    role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
    createdAt: String;
    updatedAt: String;
}

export interface UserRegisterRequest {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'STUDENT' | 'INSTRUCTOR'; // por defecto "STUDENT"
}