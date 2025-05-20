import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ConfirmdialogService {

  confirm(options: { title?: string, text?: string, confirmButtonText?: string, cancelButtonText?: string }) {
    return Swal.fire({
      icon: 'warning',
      title: options.title || '¿Estás seguro?',
      text: options.text || 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: options.confirmButtonText || 'Sí, eliminar',
      cancelButtonText: options.cancelButtonText || 'Cancelar',
    });
  }
}
