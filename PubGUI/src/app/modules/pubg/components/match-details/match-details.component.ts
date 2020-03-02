import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PubgService } from '../../pubg.service';
import { MatSnackBar } from '@angular/material';
import { MatchDetails } from '../../matchdetail';
import { MatchService } from '../../match.service';
@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  matchId:string;
  match:MatchDetails;
  userName:any;
  favoriteList:boolean = false;
  statusCode: number;
  errorStatus: string;


  constructor(private router:ActivatedRoute,private pubgService:PubgService,
    private route:Router,private snackBar:MatSnackBar,private matchService:MatchService) {
    this.matchId='';
   }

  ngOnInit() {
    this.matchId=this.router.snapshot.params["matchId"];
    this.pubgService.getMatchById(this.matchId).subscribe(data=>{
     
      this.match = data['data'];
      console.log(this.match);
    });
  }

 addToFavourite(match){
  console.log("addToFavourite");
  this.matchService.addToFavouriteList(match).subscribe(data => 
    {
      console.log(data);

      this.statusCode = data.status;
      if (this.statusCode === 201) {
        console.log('Success!!', this.statusCode);
        this.snackBar.open(data.body.message, " ", { duration: 1000 });
      }
    },

      error => {
        console.log(error);
        this.errorStatus = `${error.status}`;
        const errorMsg = `${error.error.message}`;
        this.statusCode = parseInt(this.errorStatus, 10);
        if (this.statusCode === 409) {
          this.snackBar.open(errorMsg, "", {
            duration: 1000
          });
          this.statusCode = 0;
        }
      });

 }

}
