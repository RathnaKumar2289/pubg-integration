import { Component, OnInit } from '@angular/core';
import { MatchDetails } from '../../matchdetail';

import { MatSnackBar } from '@angular/material';
import { MatchService } from '../../match.service';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent implements OnInit {
  favoriteList:boolean = true;
  favouriteMatches:MatchDetails[];
  constructor(private matchService:MatchService,private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    const message = "WishList is Empty";
    this.matchService.getFavouriteMatches().subscribe(data => {
      this.favouriteMatches = data;
      if (data.length === 0) {
        this.matSnackBar.open(message, "", { duration: 1000 });
      }
    })
  }

  deleteFromFavouriteList(match: MatchDetails) {
    this.matchService.deleteFromFavouriteList(match).subscribe(data => {
      console.log('deleted::', data);
      const index = this.favouriteMatches.indexOf(match);
      this.favouriteMatches.splice(index, 1);
      this.matSnackBar.open(data.message, "", { duration: 1000 });
    });
    return this.favouriteMatches;
  }

  updateComments(match) {
    this.matchService.updateComments(match).subscribe(
      data => {
        console.log('updated::', data);
        this.matSnackBar.open(data.body.message, "", {
          duration: 1000
        });
      });
  }


}
