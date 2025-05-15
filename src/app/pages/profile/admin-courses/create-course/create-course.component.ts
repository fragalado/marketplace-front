import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-create-course',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {

  formCourse!: FormGroup;

  categories: string[] = [
    'JAVA', 'JAVASCRIPT', 'PYTHON', 'CSHARP', 'RUBY', 'PHP', 'GO', 'SQL',
    'HTML', 'CSS', 'TYPESCRIPT', 'KOTLIN', 'RUST', 'SWIFT', 'CPLUSPLUS'
    // Añade las que quieras
  ];

  constructor(private fb: FormBuilder, private courseService: CourseService) { }

  ngOnInit(): void {
    this.formCourse = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      thumbnail_url: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      durationMinutes: [0, [Validators.required, Validators.min(1)]],
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
        },
        error: (error) => {
          console.error('Error al crear el curso:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      });
    }
  }
}
