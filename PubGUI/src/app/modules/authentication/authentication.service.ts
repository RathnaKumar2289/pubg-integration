import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export const USER_NAME = "username";
export const TOKEN_NAME = "jwt_token";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private springRegisterEndPoint: string;

  constructor(private httpClient: HttpClient) {
    this.springRegisterEndPoint = "http://localhost:8084/api/v1/authenticationservice/";    
  }

  registerUser(newUser) {
    const url = this.springRegisterEndPoint + "save";
    return this.httpClient.post(url, newUser, { observe: "response" });
  } 
  
  
  loginUser(newUser) {
    const url = this.springRegisterEndPoint + "login";
    sessionStorage.setItem(USER_NAME, newUser.userName);
    return this.httpClient.post(url, newUser, { observe: "response" });
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  isTokenAlive():boolean{
    if(localStorage.getItem(TOKEN_NAME)){
      return true;
    }else{
      return false;
    }
  }

  logout(){
   
    sessionStorage.clear();
    localStorage.clear();
  }

}
