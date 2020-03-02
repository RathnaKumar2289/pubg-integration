import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PubgService {
  pubgEndpoint: string;
 
  constructor(private httpClient: HttpClient) { 
    this.pubgEndpoint = "https://api.pubg.com/";
    
  }

  getTournaments(){
    const url=this.pubgEndpoint+"tournaments";
   return this.httpClient.get(url);
 }

 getTournamentMatches(tourid:string){
  const headers = new HttpHeaders();
  const url=this.pubgEndpoint+"tournaments/"+tourid;
 return this.httpClient.get(url);
}

getMatchById(matchId:string){
const headers = new HttpHeaders();
const url=this.pubgEndpoint+"shards/tournament/matches/"+matchId;
return this.httpClient.get(url);
}
}
