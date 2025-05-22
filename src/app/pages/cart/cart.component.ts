import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CourseResponseLiteDto } from '../../models/course';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { CategoryNamePipe } from '../../pipes/category-name.pipe';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent, FooterComponent, CurrencyPipe, CategoryNamePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartCourses: CourseResponseLiteDto[] = [];

  constructor(private cartService: CartService, private userService: UserService, private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.cartCourses = this.cartService.getCartCourses();
    this.userService.getUuidPurchasedCourses().subscribe({
      next: (uuids) => {
        this.cartCourses = this.cartCourses.filter(course => {
          if (uuids.includes(course.uuid)) {
            this.cartService.removeFromCart(course.uuid);
            return false;
          }

          return true;
        });
      },
      error: (error) => {
        console.error('Error al obtener uuids de los cursos comprados:', error);
      }
    });
  }

  getTotalPrice(): number {
    return this.cartCourses.reduce((total, course) => total + course.price, 0);
  }

  removeFromCart(courseUuid: string): void {
    this.cartCourses = this.cartService.removeFromCart(courseUuid);
    this.toast.showInfo('Curso eliminado del carrito');
  }

  payCart(): void {
    this.cartService.buyCart().subscribe({
      next: (data) => {
        this.cartCourses = [];
        this.toast.showSuccess('Cursos comprados correctamente');
      },
      error: (error) => {
        console.error("Error al comprar el carrito:", error);

        const backendMessage = error?.error?.error || error?.message || 'Error desconocido';

        // 🔐 Si el error es porque no hay token, redirigir al login
        if (backendMessage === 'Usuario no autenticado') {
          this.toast.showError('Debes iniciar sesión para realizar una compra');
          this.router.navigate(['/login']);
          return;
        }

        this.toast.showError(backendMessage);
      }
    });
  }
}
