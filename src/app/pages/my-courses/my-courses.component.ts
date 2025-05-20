import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/course';
import { UserService } from '../../services/user.service';
import { CategoryNamePipe } from '../../pipes/category-name.pipe';

@Component({
  selector: 'app-my-courses',
  imports: [NavbarComponent, FooterComponent, RouterLink, CategoryNamePipe],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {

  purchasedCourses: Course[] = [];
  pageSize: number = 6;
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getPurchasedCourses();
  }

  getPurchasedCourses(): void {
    this.userService.getPurchasedCourses(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.purchasedCourses = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error("Error al cargar cursos comprados:", err);
      }
    });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getPurchasedCourses();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getPurchasedCourses();
    }
  }

}
