import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Course } from '../../../models/course';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-course-detail',
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {

  course!: Course;
  hasPurchased = false;
  totalLessons = 0;
  showLessons = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cartService: CartService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid')!;
    this.courseService.getCourseByUuid(uuid).subscribe(courseData => {
      this.course = courseData;
      this.totalLessons = courseData.lessons?.length || 0;

      this.userService.getPurchasedCourses().subscribe({
        next: (purchasedCourses) => {
          this.hasPurchased = purchasedCourses.some(c => c.uuid === this.course.uuid);

          if (!this.hasPurchased) {
            this.course.lessons = this.course.lessons?.filter(lesson => lesson.freePreview) || [];
          }

          // Sea comprado o no, actualizamos showLessons con la cantidad mostrada
          this.showLessons = this.course.lessons?.length || 0;
        },
        error: (error) => {
          console.error('Error al obtener cursos comprados:', error);

          // En caso de error, solo mostramos las lecciones públicas
          this.course.lessons = this.course.lessons?.filter(lesson => lesson.freePreview) || [];
          this.showLessons = this.course.lessons?.length || 0;
        }
      });
    });
  }

  addToCart(course: Course): void {
    this.cartService.addToCart(course);
  }
}
