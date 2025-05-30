import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../../../services/lesson.service';
import { ToastService } from '../../../../../services/toast.service';

@Component({
  selector: 'app-create-lesson',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.css'
})
export class CreateLessonComponent implements OnInit {
  formLesson!: FormGroup;
  courseUuid!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.courseUuid = this.route.snapshot.params['uuid'];

    this.formLesson = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      video_url: ['', [Validators.required, Validators.maxLength(500)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      thumbnail_url: ['', [Validators.required, Validators.maxLength(300)]],
      durationMinutes: [1, [Validators.required, Validators.min(1)]],
      position: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      freePreview: [false]
    });
  }

  onSubmit(): void {
    if (this.formLesson.valid) {
      const dto = {
        ...this.formLesson.value,
        idCourse: this.courseUuid
      };

      console.log("DTO:", dto);

      this.lessonService.createLesson(dto).subscribe({
        next: (response) => {
          this.router.navigate(['/admin-courses', this.courseUuid, 'lessons']);
          this.toast.showSuccess('Lección creada correctamente');
        },
        error: (error) => {
          const errorMessage = error?.error?.error || 'Error desconocido al crear la lección';
          this.toast.showError(errorMessage);
        }
      });
    }
  }

  goBack(): void {
    history.back();
  }
}
