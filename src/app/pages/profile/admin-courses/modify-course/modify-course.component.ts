import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../models/enums';
import { CategoryNamePipe } from '../../../../pipes/category-name.pipe';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-modify-course',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule, CategoryNamePipe],
  templateUrl: './modify-course.component.html',
  styleUrl: './modify-course.component.css'
})
export class ModifyCourseComponent {

  formCourse!: FormGroup;
  uuid!: string;
  readonly categories = Object.values(Category);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid')!;
    this.formCourse = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      thumbnail_url: ['', [Validators.required, Validators.maxLength(300)]],
      price: [0, [Validators.required, Validators.min(0)]],
      durationMinutes: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      language: ['', Validators.required],
      level: ['', Validators.required],
      published: [false]
    });

    this.courseService.getCourseByUuid(this.uuid).subscribe(course => {
      this.formCourse.patchValue(course);
    });
  }

  onUpdate(): void {
    if (this.formCourse.valid) {
      this.courseService.updateCourse(this.uuid, this.formCourse.value).subscribe({
        next: (response) => {
          this.router.navigate(['/admin-courses']);
          this.toast.showSuccess('Curso actualizado correctamente');
        },
        error: (error) => {
          console.error('Error updating course', error);
          const errorMessage = error?.error?.error || 'Error desconocido al actualizar el curso';
          this.toast.showError(errorMessage);
        }
      });
    }
  }

  goBack(): void {
    history.back();
  }
}
