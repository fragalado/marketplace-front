import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-courses',
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {

  purchasedCourses: Course[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPurchasedCourses().subscribe({
      next: (courses) => {
        this.purchasedCourses = courses;
      },
      error: (err) => {
        console.error("Error al cargar cursos comprados:", err);
      }
    });
  }

}
