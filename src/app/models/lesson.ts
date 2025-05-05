export interface Lesson {
    id: number;
    courseId: number;
    title: string;
    content: string;
    videoUrl?: string;
    duration: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface LessonLiteDto {
    id: number;
    title: string;
    position: number;
    thumbnail_url: string;
}