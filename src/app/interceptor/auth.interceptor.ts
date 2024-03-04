import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /*if (request.url.indexOf('users/login') === -1) {
      if ( this.cookieService.get('access_token') && !request.headers.get('Authorization')) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.cookieService.get('access_token')}`
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    }*/
    return next.handle(request);
  }
}
