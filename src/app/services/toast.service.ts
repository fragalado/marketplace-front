import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: HotToastService) { }

  showSuccess(message: string) {
    this.toast.success(message, {
      iconTheme: {
        primary: '#198754', // Verde Bootstrap
        secondary: '#ffffff'
      }
    });
  }

  showError(message: string) {
    this.toast.error(message, {
      iconTheme: {
        primary: '#dc3545', // Rojo Bootstrap
        secondary: '#ffffff'
      }
    });
  }

  showInfo(message: string) {
    this.toast.info(message, {
      iconTheme: {
        primary: '#0dcaf0', // Azul claro Bootstrap
        secondary: '#ffffff'
      }
    });
  }

  showWarning(message: string) {
    this.toast.warning(message, {
      iconTheme: {
        primary: '#ffc107', // Amarillo Bootstrap
        secondary: '#212529'
      }
    });
  }
}
