import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { Course, UserCourse } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserCourse> {
    return this.http.get<UserCourse>(`${this.apiUrl}/info`);
  }

  updateUserProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/profile`, userData);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/user/courses/enrolled`);
  }

  getCreatedCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/user/courses/created`);
  }

  getPurchasedCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/me/courses`).pipe(map((response: any) => response.content));
  }
}
