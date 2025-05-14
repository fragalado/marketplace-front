import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../../../services/lesson.service';
import { Lesson } from '../../../../../models/lesson';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.params['lessonUuid'];
    this.courseId = this.route.snapshot.params['uuid'];

    this.formLesson = this.fb.group({
      title: ['', Validators.required],
      video_url: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail_url: ['', Validators.required],
      durationMinutes: [0, [Validators.required, Validators.min(1)]],
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

      console.log("UUID curso: ", this.courseId);
      console.log("UUID lección: ", this.lessonId);
      this.lessonService.updateLesson(this.lessonId, dto).subscribe({
        next: (data) => {
          console.log("Lección actualizada: ", data);
          this.router.navigate(['/admin-courses', this.courseId, 'lessons']);
        },
        error: (error) => {
          console.error("Error al actualizar la lección:", error);
        }
      });
    }
  }
}
