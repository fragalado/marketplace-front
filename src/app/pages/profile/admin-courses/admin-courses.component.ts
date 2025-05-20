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
import { ToastService } from '../../../services/toast.service';
import { ConfirmdialogService } from '../../../services/confirmdialog.service';

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

  constructor(private courseService: CourseService, private router: Router, private toast: ToastService, private confirmDialog: ConfirmdialogService) { }

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
    this.confirmDialog.confirm({
      title: 'Eliminar curso',
      text: '¿Estás seguro de que deseas eliminar este curso?'
    }).then(result => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(courseUuid).subscribe({
          next: () => {
            this.toast.showSuccess('Curso eliminado correctamente');
            this.courses = this.courses.filter(c => c.uuid !== courseUuid);
          },
          error: (err) => {
            const errorMessage = err?.error?.error || 'Error desconocido al eliminar el curso';
            this.toast.showError(errorMessage);
          }
        });
      }
    });
  }

  onManageLessons(uuid: string) {
    this.router.navigateByUrl(`/admin-courses/${uuid}/lessons`);
  }

  goBack(): void {
    history.back();
  }
}
