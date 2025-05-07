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

  getLessonsByCourse(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/course/${courseId}`).pipe(map((response: any) => response.content));
  }

  getLessonById(idLesson: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${idLesson}`);
  }

  updateLesson(idLesson: number, dto: LessonCreateDto) {
    return this.http.put<Lesson>(`${this.apiUrl}/${idLesson}`, dto);
  }

  deleteLesson(lessonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lessonId}`);
  }

  createLesson(dto: LessonCreateDto): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}`, dto);
  }


}
