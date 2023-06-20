
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage.service";
import { HttpError } from "../models/httpError";
import { MessageErrorService } from "../validation/message_error.service";

@Injectable()
export class httpErrorResponse implements HttpInterceptor {

  constructor(
    private storageService: StorageService,
    private router: Router,
    private messageErrorService: MessageErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.storageService.access_token;

    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    // if (!req.headers.has('Content-Type')) {
    //   req = req.clone({ headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8;application/json') });
    // }
    if (!req.headers.has('')) {
      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    }
    if (req.body instanceof File) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'multipart/form-data; charset=UTF-8;application/json') });
    }

    return next.handle(req).pipe(catchError(err => {
      switch (err.status) {
        // case 202: //En proceso
        //   this.mensajeErrorSuccessService.showError('En proceso');
        //   break;
        case HttpError.BadRequest: //Error 400 Bad Request
          // this.storageService.destroy();
          this.messageErrorService.showError(err.error.message);
          break;
        case HttpError.Unauthorized: // Error 401 Unauthorized
          this.router.navigateByUrl('/auth');
          this.storageService.destroy();
          break;
        case HttpError.UnprocessableEntity: //Error 422 UnprocessableEntity
          this.messageErrorService.showError(err.error.message);
          break;
        case HttpError.InternalServerError: //Error 500 InternalServerError
          this.messageErrorService.showErrorServer(err.error);
          this.router.navigateByUrl('/auth');
          this.storageService.destroy();
          break;
        default:
          break;
      }
      return new Observable<HttpEvent<any>>();
    }));
  }
}
