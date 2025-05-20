import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../../services/course.service';
import { CategoryNamePipe } from '../../../../pipes/category-name.pipe';
import { Category } from '../../../../models/enums';
import { Router } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-create-course',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule, CategoryNamePipe],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {

  formCourse!: FormGroup;

  readonly categories = Object.values(Category);

  constructor(private fb: FormBuilder, private courseService: CourseService, private router: Router, private toast: ToastService) { }

  ngOnInit(): void {
    this.formCourse = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      thumbnail_url: ['', [Validators.required, Validators.maxLength(300)]],
      price: [0, [Validators.required, Validators.min(0)]],
      durationMinutes: [1, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      language: ['', Validators.required],
      level: ['', Validators.required],
      published: [false]
    });
  }

  onSubmit(): void {
    if (this.formCourse.valid) {
      const courseData = this.formCourse.value;
      this.courseService.createCourse(courseData).subscribe({
        next: (response) => {
          this.router.navigate(['/admin-courses']);
          this.toast.showSuccess('Curso creado correctamente');
        },
        error: (error) => {
          console.error('Error al crear el curso:', error);
          const errorMessage = error?.error?.error || 'Error desconocido al crear el curso';
          this.toast.showError(errorMessage);
        }
      });
    }
  }
}
