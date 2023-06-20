import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessageSuccessService } from 'src/app/validation/message_success.service';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html',
  styles: []
})

export class UsuariosComponent implements OnInit, OnDestroy {

  public subscription = new Subscription();
  public total: number = 0;
  public usuarios!: Usuario[];
  public loading: boolean = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public usuarioService: UsuarioService,
    public messageSuccessService: MessageSuccessService) { }

  ngOnInit() {
    this.getDataUsuario();
  }

  getDataUsuario() {
    this.subscription = this.usuarioService.getUsuarios().subscribe(resp => {
      if (resp.status) {
        this.usuarios = resp.data;
        this.loading = true;
        this.total = resp.data.length;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onGoReload() {
    this.getDataUsuario();
  }

  onGoCreate() {
    this.router.navigateByUrl('acceso/usuarios/registrar');
  }

  onGoUpdate(data: Usuario) {
    // if (data.uid !== this.identityService.getIdentity.uid) {
    //   this.router.navigate(['/actualizar/usuario', data.uid]);
    // }
  }

  onGoDelete(data: Usuario) {
    // if (data.uid !== this.identityService.getIdentity.uid && data.disponible === true) {
    //   Swal.fire({
    //     title: 'Borrar usuario?',
    //     html: `Esta seguro que decea eliminar al usuario </br><b>${data.nombre}</b>`,
    //     icon: 'question',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Si, Eliminar!',
    //     cancelButtonText: 'Cancelar'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.usuarioService.deleteUsuario(data).subscribe(resp => {
    //         if (resp.status) {
    //           this.messageSuccessService.showSuccess(resp.message);
    //           this.onGoReload();
    //         }
    //       })
    //     }
    //   })
    // }
  }

  onGoActivate(data: Usuario) {
    // if (data.uid !== this.identityService.getIdentity.uid) {
    //   Swal.fire({
    //     title: 'Activar usuario?',
    //     html: `Esta seguro que decea activar al usuario </br><b>${data.nombre}</b>`,
    //     icon: 'question',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Si, Activar!',
    //     cancelButtonText: 'Cancelar'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.usuarioService.putActivate(data).subscribe(resp => {
    //         if (resp.status) {
    //           this.messageSuccessService.showSuccess(resp.message);
    //           this.onGoReload();
    //         }
    //       })
    //     }
    //   })
    // }
  }
}

