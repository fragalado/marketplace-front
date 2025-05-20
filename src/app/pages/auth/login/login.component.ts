import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../models/auth';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials: LoginRequest = {
    email: '',
    password: ''
  }

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  formUser: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  onLogin() {
    // Obtener los valores del formulario
    this.credentials.email = this.formUser.value.email;
    this.credentials.password = this.formUser.value.password;
    const rememberMe = this.formUser.value.rememberMe;


    // Llamar al servicio de autenticación
    this.authService.login(this.credentials, rememberMe).subscribe({
      next: (response) => {
        // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Login failed', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    })
  }
}
