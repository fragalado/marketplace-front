import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../models/course';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(category?: string): Observable<Course[]> {
    let params = new HttpParams();
    if (category) {
      params = params.set('category', category);
    }
    return this.http.get<Course[]>(`${this.apiUrl}`, { params }).pipe(map((response: any) => response.content));
  }

  getAllUserCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/my-courses`).pipe(map((response: any) => response.content));
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  getLessonsByCourseId(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/lesson/course/${courseId}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/course/categories`);
  }

  getPopularCourses(limit: number = 6): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}?size=${limit}`).pipe(map((response: any) => { console.log(response); return response.content; }));
  }

  getNewestCourses(limit: number = 6): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/course/newest?limit=${limit}`);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}`, course);
  }

  updateCourse(idCourse: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${idCourse}`, course);
  }
}
