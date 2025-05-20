import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { Lesson } from '../../../../models/lesson';
import { CourseLiteDto } from '../../../../models/course';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LessonService } from '../../../../services/lesson.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { ConfirmdialogService } from '../../../../services/confirmdialog.service';

@Component({
  selector: 'app-admin-lessons',
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-lessons.component.html',
  styleUrl: './admin-lessons.component.css'
})
export class AdminLessonsComponent {

  lessons: Lesson[] = [];
  course: CourseLiteDto | null = null;
  courseId!: string;

  pageSize: number = 10;
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router,
    private toast: ToastService,
    private confirmDialog: ConfirmdialogService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('uuid')!;
    this.fetchLessons();
  }

  fetchLessons(): void {
    this.lessonService
      .getLessonsByCourse(this.courseId, this.currentPage, this.pageSize)
      .subscribe({
        next: (data: any) => {
          this.lessons = data.content;
          this.totalPages = data.totalPages;
          this.course = data.content[0]?.course ?? null;
        },
        error: (error) => {
          console.error('Error al obtener las lecciones:', error);
        }
      });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchLessons();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchLessons();
    }
  }

  onEditLesson(lessonId: string): void {
    this.router.navigate(['/admin-courses', this.courseId, 'lessons', lessonId, 'edit']);
  }

  onDeleteLesson(lessonId: string): void {
    this.confirmDialog.confirm({
      title: 'Eliminar lección',
      text: '¿Estás seguro de que deseas eliminar esta lección?'
    }).then(result => {
      if (result.isConfirmed) {
        this.lessonService.deleteLesson(lessonId).subscribe({
          next: () => {
            this.lessons = this.lessons.filter(l => l.uuid !== lessonId);
            this.toast.showSuccess('Lección eliminada correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar la lección:', error);
            const errorMessage = error?.error?.error || 'Error desconocido al eliminar la lección';
            this.toast.showError(errorMessage);
          }
        });
      }
    });
  }

  goBack(): void {
    history.back();
  }
}
