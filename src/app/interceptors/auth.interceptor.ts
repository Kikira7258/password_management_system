import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the user service.
    const authToken = this.userService.auth_token;

    if (authToken) {
      // Clone the request and replace the orginal headers with
      // CLoned headers, upload with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }

    return next.handle(req);

  }
}
