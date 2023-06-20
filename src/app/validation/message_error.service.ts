import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageErrorService {

  constructor(private router: Router) { }

  showError(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
    });
  }

  showSuccess(message: string) {
    Swal.fire({
      title: 'Completado',
      text: message,
      icon: 'success',
    });
  }

  showErrorServer(error: any) {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
    });
  }

}
