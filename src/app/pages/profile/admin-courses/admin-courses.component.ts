import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-courses',
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.css'
})
export class AdminCoursesComponent implements OnInit {

  courses: Course[] = [];
  searchText: string = '';
  selectedCategory: string = '';
  categories: string[] = [
    'JAVA', 'JAVASCRIPT', 'PYTHON', 'CSHARP', 'PHP', 'GO', 'SQL', 'TYPESCRIPT', 'RUBY', 'HTML', 'CSS'
    // etc... puedes poner todas las que quieras
  ];
  pageSize: number = 10;
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getAllInstructorCourses();
  }

  getAllInstructorCourses() {
    this.courseService.getAllUserCourses(this.currentPage, this.pageSize).subscribe({
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

  filteredCourses(): Course[] {
    return this.courses.filter(c =>
      (!this.searchText || c.title.toLowerCase().includes(this.searchText.toLowerCase())) &&
      (!this.selectedCategory || c.category === this.selectedCategory)
    );
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
