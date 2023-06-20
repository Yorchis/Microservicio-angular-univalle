import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {


  private linkTheme: any  = document.querySelector('#theme');

  constructor(private http: HttpClient) {
    const url = localStorage.getItem('theme') || './assets/css/colors/default-link.css';
    localStorage.setItem('theme', url);
    this.linkTheme.setAttribute('href', url );
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.changeCheck();
  }

  changeCheck() {
    const links = document.querySelectorAll('.selector');

    links.forEach(elem => {

      elem.classList.remove('working'); //remueve todo con la clase working
      const btnTheme = elem.getAttribute('data-theme');

      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if( btnThemeUrl === currentTheme ){
        elem.classList.add('working');
      }
    });
  }
}
