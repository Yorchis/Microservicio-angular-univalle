import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IdentityService } from '../services/identity.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
    private identityService: IdentityService) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.identityService.getProfile()
      .pipe(
        tap(isAuth => {
          if (!isAuth) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.identityService.getProfile()
      .pipe(
        tap(isAuth => {
          if (!isAuth) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }
}


