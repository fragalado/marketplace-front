import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course, CourseAdminDto, CourseRequestDto, CourseResponseLiteDto } from '../models/course';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // Servicio disponible globalmente
})
export class CourseService {

  // URL base del endpoint de cursos
  private apiUrl = `${environment.apiBaseUrl}/api/courses`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los cursos publicados con paginación y filtros opcionales.
   *
   * @param page - Página actual (por defecto 0)
   * @param size - Tamaño de la página (por defecto 10)
   * @param category - Filtro por categoría (opcional)
   * @param title - Filtro por título (opcional)
   * @returns Observable con la lista paginada de cursos publicados
   */
  getPublishedCourses(page: number = 0, size: number = 10, category?: string, title?: string): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (title) params = params.set('title', title);
    if (category) params = params.set('category', category);

    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  /**
   * Obtiene los cursos creados por el usuario autenticado.
   *
   * @param page - Página actual
   * @param size - Tamaño de la página
   * @param title - Filtro por título (opcional)
   * @param category - Filtro por categoría (opcional)
   * @returns Observable con la lista de cursos creados por el usuario
   */
  getAllUserCourses(page: number, size: number, title?: string, category?: string): Observable<CourseAdminDto[]> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (title) params = params.set('title', title);
    if (category) params = params.set('category', category);

    return this.http.get<CourseAdminDto[]>(`${this.apiUrl}/my-courses`, { params });
  }

  /**
   * Obtiene los detalles completos de un curso por su UUID.
   *
   * @param uuid - UUID del curso
   * @returns Observable con los datos del curso
   */
  getCourseByUuid(uuid: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${uuid}`);
  }

  /**
   * Obtiene una lista limitada de cursos populares publicados.
   *
   * @param limit - Cantidad máxima de cursos a devolver (por defecto 6)
   * @returns Observable con los cursos populares
   */
  getPopularCourses(limit: number = 6): Observable<CourseResponseLiteDto[]> {
    return this.http.get<CourseResponseLiteDto[]>(`${this.apiUrl}/popular?size=${limit}`)
      .pipe(map((response: any) => response.content));
  }

  /**
   * Elimina un curso por su UUID.
   *
   * @param uuid - UUID del curso
   * @returns Observable vacío si la eliminación fue exitosa
   */
  deleteCourse(uuid: string) {
    return this.http.delete(`${this.apiUrl}/${uuid}`);
  }

  /**
   * Crea un nuevo curso con los datos proporcionados.
   *
   * @param course - Objeto con los datos del nuevo curso
   * @returns Observable con el curso creado
   */
  createCourse(course: CourseRequestDto): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}`, course);
  }

  /**
   * Actualiza un curso existente con nuevos datos.
   *
   * @param uuid - UUID del curso a actualizar
   * @param course - Objeto con los nuevos datos del curso
   * @returns Observable con el curso actualizado
   */
  updateCourse(uuid: string, course: CourseRequestDto): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${uuid}`, course);
  }
}
