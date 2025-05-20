import { Category, Level } from "./enums";
import { LessonLiteDto } from "./lesson";
import { User, UserLiteDto } from "./user";

export interface Course {
    uuid: string;
    title: string;
    description: string;
    category: Category;
    price: number;
    thumbnail_url: string;
    language: string;
    durationMinutes: number;
    level: Level;
    published: boolean;
    user: User;
    lessons?: LessonLiteDto[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CourseLiteDto {
    uuid: string;
    title: string;
}

export interface CourseResponseLiteDto {
    uuid: string;
    title: string;
    description: string;
    category: Category;
    price: number;
    thumbnail_url: string;
    language: string;
    durationMinutes: number;
    level: Level;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserLiteDto;
}

export interface CourseRequestDto {
    title: string;
    description: string;
    category: Category;
    price: number;
    thumbnail_url: string;
    language: string;
    durationMinutes: number;
    level: Level;
    published: boolean;
}

export interface CourseAdminDto {
    uuid: string;
    title: string;
    thumbnail_url: string;
    category: Category;
    price: number;
    published: boolean;
}