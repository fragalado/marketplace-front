import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CourseService } from '../../../services/course.service';
import { CourseAdminDto } from '../../../models/course';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryNamePipe } from '../../../pipes/category-name.pipe';
import { Category } from '../../../models/enums';

@Component({
  selector: 'app-admin-courses',
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterLink, CategoryNamePipe],
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.css'
})
export class AdminCoursesComponent implements OnInit {

  courses: CourseAdminDto[] = [];
  searchText: string = '';
  selectedCategory: string = '';

  readonly categories = Object.values(Category);

  pageSize: number = 10;
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getAllInstructorCourses();
  }

  getAllInstructorCourses(title?: string, category?: string) {
    this.courseService.getAllUserCourses(this.currentPage, this.pageSize, title, category).subscribe({
      next: (data: any) => {
        this.courses = data.content;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllInstructorCourses();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllInstructorCourses();
    }
  }

  onFiltersChange(): void {
    this.getAllInstructorCourses(this.searchText, this.selectedCategory);
  }

  onEdit(courseUuid: string): void {
    this.router.navigate(['/admin-courses/edit-course', courseUuid]);
  }

  onDelete(courseUuid: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.courseService.deleteCourse(courseUuid).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.uuid !== courseUuid);
        },
        error: (err) => console.error('Error al eliminar el curso:', err)
      });
    }
  }

  onManageLessons(uuid: string) {
    this.router.navigateByUrl(`/admin-courses/${uuid}/lessons`);
  }
}
