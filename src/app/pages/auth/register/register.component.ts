import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserRegisterDto } from '../../../models/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NavbarComponent, FooterComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userRegisterDto: UserRegisterDto = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STUDENT' // por defecto "STUDENT"
  }

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  formUser: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['STUDENT', Validators.required], // por defecto "STUDENT",
    rememberMe: [false]
  });

  onRegister() {
    // Obtener los valores del formulario
    const rembemberMe = this.formUser.value.rememberMe;

    // Llamada a la API para registrar el usuario
    this.authService.register(this.formUser.value, rembemberMe).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
