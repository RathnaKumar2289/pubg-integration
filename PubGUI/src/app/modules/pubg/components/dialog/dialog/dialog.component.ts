import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material';
import { MatchDetails } from '../../../matchdetail';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  comments:string;
  constructor(public dialogRef: MatDialogRef<DialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: MatchDetails) {
      this.comments = data.comments;
     }

  ngOnInit() {
  }

  updateComments(){
    this.dialogRef.close(this.comments);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
