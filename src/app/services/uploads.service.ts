import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponseFiles } from '../interfaces/response_files.interface';
import { IResponseMessageSuccess } from '../interfaces/response_message.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(private http: HttpClient) { }

  getFileAll() {
    const url = environment.service2 + '/files';
    return this.http.get<IResponseFiles>(url).pipe(map((resp) => resp));
  }

  deleteFile(id: String) {
    const url = environment.service2 + '/files/' + id;
    return this.http.delete<IResponseMessageSuccess>(url).pipe(map((resp) => resp));
  }

  getDownloadFile(id: String) {
    const url = environment.service2 + '/download/' + id;
    return this.http.get<any>(url).pipe(resp => resp);
  }

  async uploadFile(archivo: File) {
    try {
      const url = environment.service2 + '/upload';
      const formData = new FormData();
      formData.append('file', archivo);
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      return data;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
