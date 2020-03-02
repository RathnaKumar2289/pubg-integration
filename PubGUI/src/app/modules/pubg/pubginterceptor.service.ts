import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { HttpEvent } from '@angular/common/http';
import { AuthenticationService } from 'src/app/modules/authentication/authentication.service';
import { HttpErrorService } from 'src/app/http-error.service';
@Injectable({
  providedIn: 'root'
})
export class PubgInterceptorService implements HttpInterceptor{
  apiKey: string;
  constructor(private auth:AuthenticationService,private errorService:HttpErrorService) { 
    this.apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMDMzNDlkMC0wN2FlLTAxMzgtNThkNS0xNTY5OGE1NTgzYjciLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTc3MTA0MjYwLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImFya3VtYXI1MDYtZ21hIn0.9k21Klxc2dtJyrPkHuTzqeOu6CAtQDd74S56S8QHHnI";
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Inside interceptor");
if(req.url.includes("api.pubg.com")){
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${this.apiKey}`,
      accept: 'application/vnd.api+json'
    }
  });
}else{
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${this.auth.getToken()}`
    }
  });
}
  

    return next.handle(req).pipe(catchError((err)=>this.handleError(err)));
  }

  handleError(error: any){
    this.errorService.showError(error);
    return throwError(error);
   }
}
