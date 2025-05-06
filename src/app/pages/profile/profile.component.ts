import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserCourse } from '../../models/course';
import { UserService } from '../../services/user.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, FooterComponent, TitleCasePipe, DatePipe, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user!: UserCourse;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        // Asignamos el valor de la respuesta a la variable user
        this.user = data;
        // Convertimos la fecha de creación a un objeto Date
        this.user.created_at_date = new Date(this.user.created_at.toString());
      },
      error: (error) => {
        console.error(error);
        this.router.navigateByUrl("/login");
      }
    });
  }
}
