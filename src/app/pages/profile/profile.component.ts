import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { User, UserUpdateRequestDto } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { ConfirmdialogService } from '../../services/confirmdialog.service';

declare const bootstrap: any;

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, FooterComponent, TitleCasePipe, DatePipe, RouterLink, FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user!: User;
  editUser!: UserUpdateRequestDto;

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private toast: ToastService, private confirmDialog: ConfirmdialogService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        // Asignamos el valor de la respuesta a la variable user
        this.user = data;

        // Asignamos los valores a editUser
        this.editUser = {
          username: this.user.username,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          bio: this.user.bio,
          profilePicture: this.user.profilePicture,
          password: ''
        }
      },
      error: (error) => {
        console.error(error);
        this.router.navigateByUrl("/login");
      }
    });
  }

  onUpdateProfile() {
    if (this.editUser.password == '') this.editUser.password = undefined;
    this.userService.updateUserProfile(this.editUser).subscribe({
      next: (updatedUser) => {
        // Actualizar valores en pantalla
        console.log('Updated user:', updatedUser)
        this.user = updatedUser;
        // Cerrar modal manualmente
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal')!);
        modal?.hide();

        this.toast.showSuccess('Perfil actualizado correctamente');
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
        // Cerrar modal manualmente
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal')!);
        modal?.hide();

        const errorMessage = err?.error?.error || 'Error desconocido al actualizar el perfil';
        this.toast.showError(errorMessage);
      }
    });
  }

  onDeleteProfile() {
    this.confirmDialog.confirm({
      title: 'Eliminar perfil',
      text: '¿Estás seguro de que deseas eliminar tu perfil?'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.deleteUser().subscribe({
          next: () => {
            this.authService.logout();
            this.toast.showSuccess('Usuario eliminado correctamente');
          },
          error: err => {
            const errorMessage = err?.error?.error || 'Error desconocido al eliminar el perfil';
            this.toast.showError(errorMessage);
          }
        });
      }
    });
  }
}
