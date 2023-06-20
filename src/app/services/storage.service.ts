import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService { 
  
  private key: string = "token";

  constructor() { }

  get access_token(): any {
    const token = localStorage.getItem(this.key);
    if (token) {
      return token;
    }
    return null || 0;
  }

  get isAuthenticated(): boolean {
    return localStorage.getItem(this.key) !== null;
  }

  set(token: string | any) {
    if(token){
      localStorage.setItem(this.key, token);
    }
  }

  destroy(): void {
    localStorage.removeItem(this.key);
  }
}
