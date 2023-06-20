import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageValidation } from 'src/app/validation/message.validation';
import { StorageService } from '../services/storage.service';
import { IResponseAuthSuccess } from '../interfaces/response_auth.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public messageValidation = new MessageValidation;
  private subscription = new Subscription();
  private formSubmitSuccess: boolean = false;

  public authForm = this.fb.group({
    email: ['jorgeluisf180@gmail.com', [Validators.required]],
    password: ['123456', [Validators.required]],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router,
    private storageService: StorageService) {
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  formLogin() {
    this.formSubmitSuccess = true;
    if (this.authForm.invalid) { return; }
    this.postLogin();
  }

  campoNoValido(campo: string): boolean {
    if (this.authForm.get(campo)?.invalid && this.formSubmitSuccess) {
      return true;
    }
    return false;
  }

  postLogin() {
    this.subscription = this.authService.postSignIn(this.authForm.value).subscribe((resp: IResponseAuthSuccess) => {
      if (resp.status) {
        this.ngZone.run(() => {
          this.storageService.set(resp.token);
          this.router.navigateByUrl('/tablero');
        });
      }
    });
  }



}
