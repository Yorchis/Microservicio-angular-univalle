import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Identity } from '../models/identity.models';

@Injectable({
  providedIn: 'root'
})

export class IdentityService {

  private identity!: Identity;

  constructor(private http: HttpClient) { }

  get getIdentity() {
    return this.identity;
  }

  getProfile(): Observable<boolean> {
    const url = environment.service1 + '/profile';
    return this.http.get<any>(url).pipe(map(resp => {
      this.identity = resp.user;
      return true;
    }), catchError(() => of(false)));
  }
}




 // validarToken(): Observable<boolean> {
  //   const url = `${Constantes.httpUrl}/auth/${Constantes.path.profile}`;
  //   return this.http.get<any>(url).pipe(map(resp => resp));
  // }

  // this.store.dispatch(fromAction.LOAD_RENEW());
  // this.store.pipe(select(fromSelectors.selectRenew)).subscribe(({ token, status, auth }) => {
  //   this.ngZone.run(() => {
  //     this.identityService.set(auth);
  //     this.storageService.set(token);
  //     this.auth = auth;
  //     this.status = status;
  //   });
  // });

    // validarToken(): Observable<boolean> {
  //   const url = environment.base_url + '/auth/renew';
  //   return this.http.get<IResponseRenew>(url)
  //     .pipe(
  //       map((resp) => {
  //         console.log(resp);
  //         // this.storageService.set(token);
  //         // this.usuario = Usuario.usuarioDesdeJson(usuario);

  //         return true;
  //       }),
  //       catchError(() => of(false))
  //     )
  // }

// import { io } from "socket.io-client";
// import { Socket } from 'ngx-socket-io';




  // get token(): any {
  //   return localStorage.getItem('token') || '';
  // }


  // get headers() {
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Authorization', 'Bearer '+ this.token);
  //   headers = headers.append('Content-Type', 'application/json');
  //   headers = headers.append('Accept', 'application/json');
  //   return {
  //     headers
  //   }
  // }




  // catchError(error => this.herrorHand(error))
  // herrorHand(error: HttpErrorResponse): Observable<never> {
  //   if (error instanceof HttpErrorResponse) {
  //     if (error.error instanceof ErrorEvent) {
  //       console.log("Error del cliente");
  //       this.mensajeErrorService.showError("", 3000);
  //     } else {
  //       //status 401
  //       console.log("Error del servidor");
  //       if (error.status === 400 || error.status === 401) {
  //         this.mensajeErrorService.showError("Usted no cuenta con permisos para ingresar", 3000);
  //       } else {
  //         this.mensajeErrorService.showError("", 3000);
  //       }
  //     }
  //   } else {
  //     console.log("Otro tipo de error");
  //     this.mensajeErrorService.showError("", 3000);
  //   }
  //   return throwError(error);
  // }



   // get token(): string {
  //   return localStorage.getItem('token') || '';
  // }


  // get headers() {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', 'Bearer ' + this.token);
  //   headers = headers.set('Content-Type', 'application/json');
  //   headers = headers.set('Accept', 'application/json');
  //   return { headers: headers }
  // }


  // import { HttpHeaders } from '@angular/common/http';
// import * as actions from 'src/app/store/actions/index';
// import * as fromSelectors from 'src/app/store/selectors/index';
// import { Token } from '../models/token.models';
// import { environment } from 'src/environments/environment';
// import { IResponseToken } from '../interfaces/response_token.interface';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     Authorization: 'my-auth-token'
//   })
// };
