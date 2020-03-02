import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { MatchDetails } from '../../matchdetail';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog/dialog.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  match:MatchDetails;
  @Input()
  favoriteList:boolean;

  @Output()
  addToFavouriteList = new EventEmitter();

  @Output()
  deleteFromFavouriteList = new EventEmitter();

  @Output()
  updateFavouriteComments = new EventEmitter();


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addToFavourite(data: MatchDetails) {
    this.addToFavouriteList.emit(data);
  }

  deleteButtonClick(data: MatchDetails) {
    console.log(data);
    this.deleteFromFavouriteList.emit(data);
  }

  updateComments() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {comments: this.match.comments}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
      this.match.comments= result;
      this.updateFavouriteComments.emit(this.match);
    });
  }

  

}
