import { Injectable } from '@angular/core';
import { CourseResponseLiteDto } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible globalmente en toda la app
})
export class CartService {

  private readonly API_URL = `${environment.apiBaseUrl}/api/purchases`; // Endpoint para realizar la compra
  private readonly STORAGE_KEY = 'cart'; // Clave para acceder al carrito en localStorage

  constructor(private http: HttpClient) { }

  /**
   * Añade un curso al carrito.
   * Verifica si ya existe para evitar duplicados.
   * 
   * @param course - Curso que se desea añadir al carrito
   */
  addToCart(course: CourseResponseLiteDto): void {
    const cartCourses = this.getCartCourses();

    const exists = cartCourses.some(c => c.uuid === course.uuid);
    if (!exists) {
      cartCourses.push(course);
      this.saveCart(cartCourses);
    }
  }

  /**
   * Elimina un curso del carrito usando su UUID.
   * 
   * @param courseUuid - UUID del curso a eliminar
   * @returns Lista actualizada del carrito
   */
  removeFromCart(courseUuid: string): CourseResponseLiteDto[] {
    const cartCourses = this.getCartCourses()
      .filter(course => course.uuid !== courseUuid);
    this.saveCart(cartCourses);
    return this.getCartCourses();
  }

  /**
   * Obtiene todos los cursos almacenados en el carrito.
   * 
   * @returns Arreglo de cursos en el carrito
   */
  getCartCourses(): CourseResponseLiteDto[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error al leer el carrito:', error);
      return [];
    }
  }

  /**
   * Elimina todos los cursos del carrito.
   */
  clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Realiza la compra de todos los cursos que hay en el carrito.
   * 
   * @returns Observable con la respuesta del backend o error si no está autenticado o el carrito está vacío
   */
  buyCart(): Observable<any> {
    const token = localStorage.getItem('auth_token');

    // Si no hay token, el usuario no está autenticado
    if (!token) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    // Extraer los cursos del carrito
    const cartCourses: CourseResponseLiteDto[] = this.getCartCourses();

    if (!cartCourses.length) {
      return throwError(() => new Error('El carrito está vacío'));
    }

    // Extraer UUIDs para enviar al backend
    const uuids: string[] = cartCourses.map(course => course.uuid);

    // Enviar la solicitud de compra al backend
    return this.http.post(`${this.API_URL}`, { courseUuids: uuids }).pipe(
      tap(() => {
        // Limpiar el carrito si la compra fue exitosa
        this.clearCart();
      }),
      catchError((err) => {
        console.error('Error al procesar la compra', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Guarda la lista de cursos en el carrito dentro del localStorage.
   * 
   * @param courses - Lista de cursos que se desean guardar
   */
  private saveCart(courses: CourseResponseLiteDto[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(courses));
  }
}
