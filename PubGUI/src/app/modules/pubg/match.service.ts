import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatchDetails } from './matchdetail';
import {ServiceResponse} from '../../serviceresponse';

export const USER_NAME = "username";
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  springEndPoint:String;
  username:String;
  constructor(private httpClient: HttpClient) {
    this.springEndPoint = "http://localhost:8085/api/v1/userservice/";
   }

   getFavouriteMatches(){
    this.username = sessionStorage.getItem(USER_NAME);
    const url = this.springEndPoint + 'user/' + this.username + '/matches';
    return this.httpClient.get<MatchDetails[]>(url);

   }

   addToFavouriteList(match: MatchDetails) {
    this.username = sessionStorage.getItem(USER_NAME);
    const url = this.springEndPoint + 'user/' + this.username + '/match';
    return this.httpClient.post<ServiceResponse>(url, match, {
      observe: "response"
    })

  }

  updateComments(match: MatchDetails) {
    this.username = sessionStorage.getItem(USER_NAME);
    const url = this.springEndPoint + 'user/' + this.username + '/match';
    return this.httpClient.patch<ServiceResponse>(url, match, { observe: 'response' });
  }


  deleteFromFavouriteList(match: MatchDetails) {
    this.username = sessionStorage.getItem(USER_NAME);
    const url = this.springEndPoint + 'user/' + this.username + '/match';
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: match
    }
    return this.httpClient.delete<ServiceResponse>(url, options);
  }


}
