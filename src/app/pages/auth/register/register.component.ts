import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NavbarComponent, FooterComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userRegisterDto: RegisterRequest = {
    username: '',
    email: '',
    password: ''
  }

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  formUser: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onRegister() {
    // Obtener los valores del formulario
    this.userRegisterDto.username = this.formUser.value.username;
    this.userRegisterDto.email = this.formUser.value.email;
    this.userRegisterDto.password = this.formUser.value.password;

    // Llamada a la API para registrar el usuario
    this.authService.register(this.userRegisterDto).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
