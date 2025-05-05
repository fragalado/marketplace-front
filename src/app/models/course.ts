import { LessonLiteDto } from "./lesson";

export interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail_url: string;
    category: string;
    user: UserCourse;
    lessons?: LessonLiteDto[];
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCourse {
    id: number;
    username: string;
    email: string;
    role: string;
    created_at: String;
    created_at_date: Date;
    updated_at: String;
}