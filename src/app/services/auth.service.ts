import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SignIn } from '../models/signIn.models';
import { environment } from 'src/environments/environment';
import { SignUp } from '../models/signUp.models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  postSignIn(data: SignIn): Observable<any> {
    const url = environment.service1 + '/signin';
    return this.http.post<any>(url, data).pipe(map(resp => resp));
  }

  postSignUp(data: SignUp): Observable<any> {
    const url = environment.service1 + '/signup';
    return this.http.post<any>(url, data).pipe(map(resp => resp));
  }

  logout() {
    const url = environment.service1 + '/logout';
    return this.http.post<any>(url, undefined).pipe(map(resp => resp));
  }

}

