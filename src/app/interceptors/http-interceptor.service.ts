import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

    const headerToken = this.authService.fetchToken();

    if (headerToken != null) {
      request = request.clone({
        headers: request.headers.set(
          'x-access-token',
          `${headerToken}`
        ),
      });
    }
    return newRequest.handle(request);
  }
}
