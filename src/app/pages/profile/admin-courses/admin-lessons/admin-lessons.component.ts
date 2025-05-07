import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { Lesson } from '../../../../models/lesson';
import { CourseLiteDto } from '../../../../models/course';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LessonService } from '../../../../services/lesson.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-lessons',
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './admin-lessons.component.html',
  styleUrl: './admin-lessons.component.css'
})
export class AdminLessonsComponent {

  lessons: Lesson[] = [];
  course: CourseLiteDto | null = null;
  courseId?: number;

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private router: Router) { }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    this.getAllLessonsByCourseId(this.courseId);
  }

  getAllLessonsByCourseId(courseId: number) {
    this.lessonService.getLessonsByCourse(courseId).subscribe({
      next: (data) => {
        this.lessons = data;
        this.course = this.lessons[0].course ?? null;
      }, error: (error) => {
        console.error('Error al obtener las lecciones:', error);
      }
    });
  }

  onEditLesson(lessonId: number): void {
    this.router.navigate(['/admin-courses', this.courseId, 'lessons', lessonId, 'edit']);
  }

  onDeleteLesson(lessonId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta lección?')) {
      this.lessonService.deleteLesson(lessonId).subscribe({
        next: () => {
          this.lessons = this.lessons.filter(l => l.id !== lessonId);
        },
        error: (error) => {
          console.error('Error al eliminar la leccion: ', error)
        }
      });
    }
  }
}
