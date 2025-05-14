import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Course } from '../../../models/course';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-course-detail',
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {

  course!: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid')!;
    this.courseService.getCourseByUuid(uuid).subscribe(data => {
      this.course = data;
    });
  }

  addToCart(course: Course): void {
    this.cartService.addToCart(course);
  }
}
