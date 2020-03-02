import { Component, OnInit } from '@angular/core';
import {Match} from '../../match';
import { PubgService } from 'src/app/modules/pubg/pubg.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  userName:any;
  matches:Array<Match>;
  tournamentId:string;
  constructor(private router:ActivatedRoute,private route:Router,private pubgService:PubgService) {
    this.matches=[];
    this.tournamentId='';
   }

  ngOnInit() {
    
    this.tournamentId=this.router.snapshot.params["tournamentId"];
    this.pubgService.getTournamentMatches(this.tournamentId).subscribe(data=>{
      console.log(data);
      this.matches =  data['included'];
    })
    this.userName=localStorage.getItem("userId");
  }

}
