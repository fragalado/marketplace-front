import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CourseResponseLiteDto } from '../../models/course';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { CategoryNamePipe } from '../../pipes/category-name.pipe';

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent, FooterComponent, CurrencyPipe, CategoryNamePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartCourses: CourseResponseLiteDto[] = [];

  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit(): void {
    this.cartCourses = this.cartService.getCartCourses();
    this.userService.getUuidPurchasedCourses().subscribe({
      next: (uuids) => {
        console.log("Cursos carrito:", this.cartCourses);
        console.log("UUIDS:", uuids);
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
  }

  payCart(): void {
    this.cartService.buyCart().subscribe({
      next: (data) => {
        this.cartCourses = [];
      },
      error: (error) => {
        console.error("Error al comprar el carrito:", error);
      }
    });
  }
}
