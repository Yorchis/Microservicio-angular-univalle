import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelComponent } from './tablero/panel.component';
import { UsuariosComponent } from './usuario/usuario.component';
import { LayoutModule } from '../layout/layout.module';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from './usuario/crear-usuario.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { CrearArchivoComponent } from './archivos/crear-archivo.component';


@NgModule({
  declarations: [
    PanelComponent,
    UsuariosComponent,
    ArchivosComponent,
    CrearUsuarioComponent,
    CrearArchivoComponent,
    PagesComponent,
  ],
  exports: [
    PanelComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    RouterModule,
  ],
  schemas: []

})

export class PagesModule { }
