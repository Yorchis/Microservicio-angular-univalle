import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Identity } from 'src/app/models/identity.models';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { IdentityService } from 'src/app/services/identity.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  public subscription = new Subscription();
  public identity!: Identity;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private identityService: IdentityService) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.identity = this.identityService.getIdentity;
  }

  logout() {
    this.subscription = this.authService.logout().subscribe(resp => {
      if (resp.status) {
        this.router.navigateByUrl('/auth');
        this.storageService.destroy();
      }
    });
  }
}
