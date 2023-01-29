import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable,throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token:string = localStorage.getItem('token');
    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Catching Error Stage
        if (error && error.status === 401) {
            console.log("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
        }
        const err = error.error.message || error.statusText;
        return throwError(error); // any further errors are returned to frontend                    
   })
    );
  }
}
