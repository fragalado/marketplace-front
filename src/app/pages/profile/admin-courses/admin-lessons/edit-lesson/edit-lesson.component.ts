import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../../../services/lesson.service';
import { Lesson } from '../../../../../models/lesson';
import { ToastService } from '../../../../../services/toast.service';

@Component({
  selector: 'app-edit-lesson',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent implements OnInit {
  formLesson!: FormGroup;
  lessonId!: string;
  courseId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.params['lessonUuid'];
    this.courseId = this.route.snapshot.params['uuid'];

    this.formLesson = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      video_url: ['', [Validators.required, Validators.maxLength(500)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      thumbnail_url: ['', [Validators.required, Validators.maxLength(300)]],
      durationMinutes: [0, [Validators.required, Validators.min(1)]],
      position: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      freePreview: [false]
    });

    this.lessonService.getLessonByUuid(this.lessonId).subscribe((lesson: Lesson) => {
      this.formLesson.patchValue(lesson);
    });
  }

  onUpdate(): void {
    if (this.formLesson.valid) {
      const dto = {
        ...this.formLesson.value,
        idCourse: this.courseId
      };

      this.lessonService.updateLesson(this.lessonId, dto).subscribe({
        next: (data) => {
          this.router.navigate(['/admin-courses', this.courseId, 'lessons']);
          this.toast.showSuccess('Lección actualizada correctamente');
        },
        error: (error) => {
          console.error("Error al actualizar la lección:", error);
          const errorMessage = error?.error?.error || 'Error desconocido al actualizar la lección';
          this.toast.showError(errorMessage);
        }
      });
    }
  }
}
