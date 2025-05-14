import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Course } from '../../models/course';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent, FooterComponent, CurrencyPipe, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartCourses: Course[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartCourses = this.cartService.getCartCourses();
  }

  getTotalPrice(): number {
    return this.cartCourses.reduce((total, course) => total + course.price, 0);
  }

  removeFromCart(courseUuid: string): void {
    this.cartCourses = this.cartService.removeFromCart(courseUuid);
  }

  payCart(): void {
    console.log("Ha entrado en payCart");
    this.cartService.buyCart().subscribe({
      next: (data) => {
        console.log("Carrito comprado.");
        this.cartCourses = [];
      },
      error: (error) => {
        console.error("Error al comprar el carrito:", error);
      }
    });
  }
}
