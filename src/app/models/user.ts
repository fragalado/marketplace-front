import { Course } from "./course";

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
    enrolledCourses?: Course[];
    createdCourses?: Course[];
    createdAt: Date;
    updatedAt: Date;
}

export interface UserRegisterRequest {
    username: string;
    email: string;
    password: string;
}