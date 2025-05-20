import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../../services/course.service';
import { CategoryNamePipe } from '../../../../pipes/category-name.pipe';
import { Category } from '../../../../models/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule, CategoryNamePipe],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {

  formCourse!: FormGroup;

  readonly categories = Object.values(Category);

  constructor(private fb: FormBuilder, private courseService: CourseService, private router: Router) { }

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
          // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
          this.router.navigate(['/admin-courses']);
        },
        error: (error) => {
          console.error('Error al crear el curso:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      });
    }
  }
}
