import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CourseResponseLiteDto } from '../../models/course';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CategoryNamePipe } from '../../pipes/category-name.pipe';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, NavbarComponent, CategoryNamePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private courseService = inject(CourseService);

  popularCourses = signal<CourseResponseLiteDto[]>([]);

  ngOnInit(): void {
    // Cargar cursos populares
    this.courseService.getPopularCourses(6).subscribe({
      next: (data) => {
        this.popularCourses.set(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
