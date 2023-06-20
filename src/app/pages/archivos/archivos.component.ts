import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MessageValidation } from 'src/app/validation/message.validation';
import { Articulo } from 'src/app/models/articulo.models';
import { Router } from '@angular/router';
import { File } from 'src/app/models/file.models';
import { UploadsService } from 'src/app/services/uploads.service';
import { environment } from 'src/environments/environment';
import { MessageErrorService } from 'src/app/validation/message_error.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html'
})

export class ArchivosComponent implements OnInit, OnDestroy {

  private subscription = new Subscription;
  public messageValidation = new MessageValidation;
  public archivos!: File[];
  public total: number = 0;
  public loading: boolean = false;
  public categoriasLength: number = 0;

  constructor(
    private router: Router,
    private messageErrorService: MessageErrorService,
    private uploadService: UploadsService) { }

  ngOnInit() {
    this.getDataArticulos();
  }

  getDataArticulos() {
    this.subscription = this.uploadService.getFileAll().subscribe(resp => {
      if (resp.status) {
        this.archivos = resp.data;
        this.total = resp.data.length;
        this.loading = true;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setImagenUrl(id: string): string {
    // http://localhost:4010/image/6491d6201f2632d3c21724f0
    return environment.service2 + '/image/' + id;
  }

  onGoCreate() {
    this.router.navigateByUrl('unidad/archivos/registrar');
  }

  onGoDelete(data: File) {
    Swal.fire({
      title: 'Borrar producto?',
      html: `Esta seguro que decea eliminar el articulo </br><b>${data.filename}</b>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription = this.uploadService.deleteFile(data._id).subscribe(resp => {
          if (resp.status) {
            this.messageErrorService.showSuccess(resp.message);
            this.onGoReload();
          }
        })
      }
    })
  }

  onGoDownload(data: File) {
    saveAs(environment.service2 + '/image/' + data._id, data.filename + '.png');
    // this.subscription = this.uploadService.getDownloadFile(data._id).subscribe(resp => {      
    //   if (resp.status) {
    //     this.messageErrorService.showSuccess(resp.message);
    //     this.onGoReload();
    //   }
    // })
  }

  onGoReload() {
    this.getDataArticulos();
  }

}

