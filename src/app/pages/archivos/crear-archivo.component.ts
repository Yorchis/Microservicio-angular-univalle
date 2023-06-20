import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UploadsService } from 'src/app/services/uploads.service';
import { MessageSuccessService } from 'src/app/validation/message_success.service';

@Component({
  selector: 'app-crear-archivo',
  templateUrl: './crear-archivo.component.html',
  styleUrls: ['./crear-archivo.component.css']
})
export class CrearArchivoComponent implements OnInit {

  imageError!: string;
  isImageSaved!: boolean;
  cardImageBase64!: string;

  public subscription = new Subscription();
  public error!: any;
  public profilePic!: File;
  public formSubmitSuccess = false;
  public imageTemp: any = 'assets/images/usuario_profile.png';
  public imageUrl: any = null;
  public imgSubir!: File;
  public miEvent!: any;
  public successAndDanger = '';

  public createArticuloForm = this.fb.group({
    file: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageSuccessService: MessageSuccessService,
    public uploadsService: UploadsService) { }

  ngOnInit() {}

  campoNoValido(campo: string): boolean {
    if (this.createArticuloForm.get(campo)?.invalid && this.formSubmitSuccess) {
      return true;
    }
    return false;
  }

  formArticulo() {
    this.formSubmitSuccess = true;
    if (this.createArticuloForm.invalid) {
      return;
    }
    this.onGoCreateImage();
  }

  onGoCreateImage() {
    this.uploadsService.uploadFile(this.profilePic).then(resp => {
      if (resp.status) {
        this.messageSuccessService.showSuccess(resp.message);
        this.router.navigateByUrl('unidad/archivos');
      }
    })
  }

  confirmCancel(event?: Event) {
    event?.preventDefault();
    Swal.fire({
      title: 'Cancelar captura',
      text: 'Si cancela no se guardarán los datos introducidos, ¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, salir!'
    }).then(resp => {
      if (resp.value) {
        this.router.navigateByUrl('unidad/archivos');
      }
    });
  }


  fileChangeEvent(fileInput: any): any {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        const imgBase64Path = e.target.result;
        this.cardImageBase64 = imgBase64Path;
        this.isImageSaved = true;
        this.profilePic = fileInput.target.files[0];
        this.createArticuloForm.get('file')?.setValue(fileInput.target.files[0]);
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = '';
    this.isImageSaved = false;
  }

}
