import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);
  roleIsInstructor = computed(() => this.user()?.role === 'INSTRUCTOR');

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  cartCount(): number {
    return this.cartService.getCartCourses().length;
  }

  logout(): void {
    this.authService.logout();
  }
}
