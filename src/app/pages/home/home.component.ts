import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private courseService = inject(CourseService);

  popularCourses = signal<Course[]>([]);

  ngOnInit(): void {
    // Cargar cursos populares
    this.courseService.getPopularCourses(6).subscribe({
      next: (data) => {
        console.log("Home data:", data);
        this.popularCourses.set(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
