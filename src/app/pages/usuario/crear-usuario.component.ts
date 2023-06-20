import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageValidation } from 'src/app/validation/message.validation';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageSuccessService } from 'src/app/validation/message_success.service';
import { AuthService } from 'src/app/services/auth.service';
import { IResponseUsuario } from 'src/app/interfaces/response_usuarios.interface';
import { Usuario } from 'src/app/models/usuario.models';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: []
})
export class CrearUsuarioComponent implements OnInit, OnDestroy {

  public files!: any;
  public previsualizacion!: string;
  public archivos: any = [];
  public progress: number = 0;
  public usuario: Usuario = new Usuario();

  public formSubmitSuccess: boolean = false;
  public messageValidation = new MessageValidation();
  public isDisabled: boolean = true;
  private subscription = new Subscription();
  public filesToUpload!: Array<File>;
  public total: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageSuccessService: MessageSuccessService) { }


  public createUsuarioForm = this.fb.group({
    name: ['luis jorge mamani mamani', [Validators.required]],
    email: ['luis@gmail.com', [Validators.required, Validators.email]],
    password: ['123456789', [Validators.required]],
  });


  // onFileChange(event:any) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.data.parentForm.patchValue({
  //         tso: reader.result
  //       });

  //       // need to run CD since file load runs outside of zone
  //       // this.cd.markForCheck();
  //     };
  //   }
  // }


  getImgController() {
    return this.createUsuarioForm.get('photo')?.value;
  }

  // public onFileSelected(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.files = event.target.files[0];
  //     if (this.files.type.includes('image/jpg') || this.files.type.includes('image/png') || this.files.type.includes('image/jpeg')) {
  //       this.extraerBase64(this.files).then((image: any) => {
  //         return this.createUsuarioForm.get('photo')?.setValue(image.base);
  //       });
  //     } else {
  //       console.log("error");
  //     }
  //   }
  // }

  // extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
  //   try {
  //     const unsafeImg = window.URL.createObjectURL($event);
  //     const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
  //     const reader = new FileReader();
  //     reader.readAsDataURL($event);
  //     reader.onload = (() => {
  //       resolve({
  //         base: reader.result,
  //         image,
  //         unsafeImg
  //       });
  //     });
  //     reader.onerror = error => {
  //       resolve({
  //         base: null,
  //       });
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // });

  ngOnInit() {
    this.getDataRoles();
    // this.errorHandlerService.dispardorErrorValidator.subscribe((resp: User) => {
    //   if(resp){
    //     this.usuario.email = resp.email;
    //   }
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  campoNoValido(campo: string): boolean {
    if (this.createUsuarioForm.get(campo)?.invalid && this.formSubmitSuccess) {
      return true;
    }
    return false;
  }

  onGoCreate() {
    this.formSubmitSuccess = true;
    if (this.createUsuarioForm.invalid) { return; }
    this.postUsuario();
  }


  postUsuario() {  
    this.authService.postSignUp(this.createUsuarioForm.value).subscribe((resp: IResponseUsuario) => {
      if (resp.status) {
        this.messageSuccessService.showSuccess(resp.message);
        this.router.navigateByUrl('acceso/usuarios');
      }
    });
  }

  fileEvent(e: any) {
    this.files = e.target.files[0];
  }

  getDataRoles() {
    // this.subscription = this.rolService.getRoles().subscribe(resp => {
    //   if (resp.status) {
    //     this.roles = resp.data;
    //     this.total = resp.data.length;
    //   }
    // })
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
        this.router.navigateByUrl('acceso/usuarios');
      }
    });
  }

}

