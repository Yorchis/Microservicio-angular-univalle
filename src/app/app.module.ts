import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { APP_ROUTES } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpErrorResponse } from './interceptor/httpErrorResponse';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthRoutingModule,
    PagesModule,
    APP_ROUTES,
    AuthModule,
    BrowserModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpErrorResponse,
      multi: true,
    }
  ],
})
export class AppModule { }
