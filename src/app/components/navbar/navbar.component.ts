import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private authService = inject(AuthService);

  // Exponer el servicio de autenticación en la plantilla
  get aauthService() {
    return this._authService;
  }

  // Signal para el usuario actual
  user = this.authService.currentUser;

  constructor(private _authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}
