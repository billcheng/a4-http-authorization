import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HttpAuthorizationService } from './http-authorization.service';

@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(private authService: HttpAuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authHeader = this.authService.canInjectAuthorizationHeader(req) ? this.authService.getAuthorizationHeader() : '';

    const authReq = !!authHeader ? req.clone({ setHeaders: { Authorization: authHeader } }) : req;

    return next
      .handle(authReq);
  }

}
