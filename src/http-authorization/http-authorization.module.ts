import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthorizationInterceptor } from './http-authorization.interceptor';
import { HttpAuthorizationService } from './http-authorization.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthorizationInterceptor,
    multi: true,
  },
    HttpAuthorizationService
  ],
})
export class HttpAuthorizationModule { }