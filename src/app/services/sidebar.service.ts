import { Injectable } from '@angular/core';
import { ResponseSidebar } from 'src/app/interfaces/response_sidebar.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: ResponseSidebar[] = [
    {
      title: 'Tablero',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'panel', url: 'tablero/panel' },
      ]
    },
    {
      title: 'Acceso',
      icon: 'mdi mdi-account-box',
      submenu: [
        { title: 'usuarios', url: 'acceso/usuarios' },
      ]
    },
    {
      title: 'Unidad',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'archivos', url: 'unidad/archivos' },
      ]
    },
  ];
}
