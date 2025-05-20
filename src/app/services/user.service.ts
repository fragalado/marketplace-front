import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // Este servicio está disponible globalmente
})
export class UserService {

  // URL base del endpoint de usuarios
  private apiUrl = `${environment.apiBaseUrl}/api/users`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el perfil del usuario autenticado.
   *
   * @returns Observable con los datos del usuario
   */
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  /**
   * Actualiza el perfil del usuario autenticado.
   *
   * @param userData - Datos parciales del usuario a actualizar
   * @returns Observable con el usuario actualizado
   */
  updateUserProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}`, userData);
  }

  /**
   * Elimina el perfil del usuario autenticado.
   *
   * @returns Observable vacío si la eliminación fue exitosa
   */
  deleteUser(): Observable<any> {
    return this.http.delete(`${this.apiUrl}`);
  }

  /**
   * Obtiene los cursos comprados por el usuario autenticado (con paginación).
   *
   * @param page - Página actual
   * @param pageSize - Cantidad de cursos por página
   * @returns Observable con los cursos comprados
   */
  getPurchasedCourses(page: number, pageSize: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', pageSize);
    return this.http.get<any>(`${this.apiUrl}/me/courses`, { params });
  }

  /**
   * Obtiene solo los UUIDs de los cursos comprados por el usuario autenticado.
   *
   * @returns Observable con un array de UUIDs
   */
  getUuidPurchasedCourses(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/me/courses/uuids`);
  }

}
