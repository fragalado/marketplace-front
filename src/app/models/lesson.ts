import { CourseLiteDto } from "./course";

export interface Lesson {
    uuid: string;
    title: string;
    video_url?: string;
    position: number;
    description: string;
    thumbnail_url: string;
    durationMinutes: number;
    freePreview: boolean;
    created_at: Date;
    updated_at: Date;
    course: CourseLiteDto;
}

export interface LessonCreateDto {
    title: string;
    video_url: string;
    description: string;
    thumbnail_url: string;
    durationMinutes: number;
    freePreview: boolean;
    idCourse: string;
}

export interface LessonLiteDto {
    uuid: string;
    title: string;
    position: number;
    thumbnail_url: string;
    freePreview: boolean;
}