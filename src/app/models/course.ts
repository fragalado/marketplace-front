import { LessonLiteDto } from "./lesson";

export interface Course {
    uuid: string;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail_url: string;
    language: string;
    durationMinutes: number;
    level: string;
    published: boolean;
    user: UserCourse;
    lessons?: LessonLiteDto[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CourseLiteDto {
    uuid: string;
    title: string;
}

export interface UserCourse {
    uuid: string;
    username: string;
    firstName: string;
    lastName: string;
    bio?: string;
    profilePicture?: string;
    email: string;
    role: string;
    created_at: String;
    created_at_date: Date;
    updated_at: String;
}