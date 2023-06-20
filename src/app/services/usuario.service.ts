import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IResponseUsuario } from '../interfaces/response_usuarios.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios() {
    const url = environment.service1 + '/usuarios';
    return this.http.get<IResponseUsuario>(url).pipe(map(resp => resp));
  }

}
