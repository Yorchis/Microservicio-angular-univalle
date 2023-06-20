import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageSuccessService {

  constructor(private router: Router) { }

  showSuccess(message: string) {
    Swal.fire({
      title: 'Completado',
      text: message,
      icon: 'success',
    });
  }
}
