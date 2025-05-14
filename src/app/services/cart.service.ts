import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly API_URL = 'http://localhost:8080/api/purchases';
  private readonly STORAGE_KEY = 'cart';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Añade un curso al carrito. Evita duplicados.
   */
  addToCart(course: Course): void {
    const cartCourses = this.getCartCourses();

    const exists = cartCourses.some(c => c.uuid === course.uuid);
    if (!exists) {
      cartCourses.push(course);
      this.saveCart(cartCourses);
    }
  }

  /**
   * Elimina un curso del carrito por UUID.
   */
  removeFromCart(courseUuid: string): Course[] {
    const cartCourses = this.getCartCourses()
      .filter(course => course.uuid !== courseUuid);
    this.saveCart(cartCourses);
    return this.getCartCourses();
  }

  /**
   * Devuelve todos los cursos del carrito.
   */
  getCartCourses(): Course[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error al leer el carrito:', error);
      return [];
    }
  }

  /**
   * Limpia completamente el carrito.
   */
  clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Compra todos los cursos del carrito
   */
  buyCart(): Observable<any> {
    const token = localStorage.getItem('auth_token');

    // Comprobar si el usuario está autenticado
    if (!token) {
      // Si no está logueado, redirigimos
      this.router.navigateByUrl('/login');
      return throwError(() => new Error('Usuario no autenticado'));
    }

    // Obtener cursos del carrito
    const cartCourses: Course[] = this.getCartCourses();

    if (!cartCourses.length) {
      return throwError(() => new Error('El carrito está vacío'));
    }

    // Extraer UUIDs de los cursos
    const uuids: string[] = cartCourses.map(course => course.uuid);

    // Enviar petición de compra
    return this.http.post(`${this.API_URL}`, { courseUuids: uuids }).pipe(
      tap(() => {
        // Limpiar carrito después de la compra
        localStorage.removeItem('cart');
      }),
      catchError((err) => {
        console.error('Error al procesar la compra', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Guarda el carrito en localStorage.
   */
  private saveCart(courses: Course[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(courses));
  }
}
