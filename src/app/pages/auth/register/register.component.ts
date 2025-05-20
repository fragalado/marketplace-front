import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserRegisterDto } from '../../../models/user';
import { ToastService } from '../../../services/toast.service';

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
  private toast = inject(ToastService);

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
        this.toast.showSuccess('Usuario registrado correctamente');
      },
      error: (error) => {
        // Intenta extraer el mensaje si viene del backend
        const backendMessage = error?.error?.error || 'Error desconocido al autenticar';

        this.toast.showError(backendMessage);
      }
    });
  }
}
