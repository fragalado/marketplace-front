import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson, LessonRequestDto } from '../models/lesson';

@Injectable({
  providedIn: 'root' // Este servicio se inyecta globalmente
})
export class LessonService {

  // URL base del endpoint de lecciones
  private apiUrl = 'http://localhost:8080/api/lessons';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las lecciones de un curso específico con paginación.
   *
   * @param courseUuid - UUID del curso
   * @param page - Página actual
   * @param size - Cantidad de resultados por página
   * @returns Observable con la lista de lecciones del curso
   */
  getLessonsByCourse(courseUuid: string, page: number, size: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/course/${courseUuid}?page=${page}&size=${size}`);
  }

  /**
   * Obtiene una lección por su UUID.
   *
   * @param lessonUuid - UUID de la lección
   * @returns Observable con los datos de la lección
   */
  getLessonByUuid(lessonUuid: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${lessonUuid}`);
  }

  /**
   * Actualiza los datos de una lección existente.
   *
   * @param lessonUuid - UUID de la lección a actualizar
   * @param dto - Objeto con los nuevos datos de la lección
   * @returns Observable con la lección actualizada
   */
  updateLesson(lessonUuid: string, dto: LessonRequestDto): Observable<Lesson> {
    return this.http.put<Lesson>(`${this.apiUrl}/${lessonUuid}`, dto);
  }

  /**
   * Elimina una lección por su UUID.
   *
   * @param lessonUuid - UUID de la lección a eliminar
   * @returns Observable vacío si la eliminación fue exitosa
   */
  deleteLesson(lessonUuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lessonUuid}`);
  }

  /**
   * Crea una nueva lección asociada a un curso.
   *
   * @param dto - Objeto con los datos de la nueva lección
   * @returns Observable con la lección creada
   */
  createLesson(dto: LessonRequestDto): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}`, dto);
  }

}
