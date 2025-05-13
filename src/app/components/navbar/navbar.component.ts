import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);
  roleIsInstructor = computed(() => this.user()?.role === 'INSTRUCTOR');
  roleIsStudent = computed(() => this.user()?.role === 'STUDENT')

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout();
  }
}
