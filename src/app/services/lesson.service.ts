import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Lesson, LessonCreateDto } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = 'http://localhost:8080/api/lessons'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getLessonsByCourse(courseId: string, page: number, size: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/course/${courseId}?page=${page}&size=${size}`);
  }

  getLessonByUuid(lessonUuid: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${lessonUuid}`);
  }

  updateLesson(lessonUuid: string, dto: LessonCreateDto) {
    return this.http.put<Lesson>(`${this.apiUrl}/${lessonUuid}`, dto);
  }

  deleteLesson(lessonUuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lessonUuid}`);
  }

  createLesson(dto: LessonCreateDto): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}`, dto);
  }


}
