import { NgModule } from '@angular/core';
import { UsuariosComponent } from './usuario/usuario.component';
import { Routes, RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from './usuario/crear-usuario.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { PanelComponent } from './tablero/panel.component';
import { CrearArchivoComponent } from './archivos/crear-archivo.component';

const childRoutes: Routes = [
  {
    path: 'tablero',
    children: [
      { path: 'panel', component: PanelComponent },
      { path: '', redirectTo: 'panel', pathMatch: 'full' },
    ],
    data: {
      title: "Tablero",
      subtitle: "Panel"
    }
  },
  {
    path: 'acceso',
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios/registrar', component: CrearUsuarioComponent },
      { path: 'acceso', redirectTo: 'acceso/usuarios' },
    ],
    data: {
      title: "Acceso",
      subtitle: "Usuarios"
    }
  },
  {
    path: 'unidad',
    children: [
      { path: 'archivos', component: ArchivosComponent },
      { path: 'archivos/registrar', component: CrearArchivoComponent },
      { path: 'unidad', redirectTo: 'unidad/archivos' },
    ],
    data: {
      title: "Inidad",
      subtitle: "Archivos"
    }
  },

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
