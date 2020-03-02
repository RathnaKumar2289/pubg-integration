import { Component, OnInit } from '@angular/core';
import { PubgService } from 'src/app/modules/pubg/pubg.service';
import {Tournament} from '../../tournament';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
tournaments:Array<Tournament>;
  constructor(private pubgService: PubgService) { }

  ngOnInit() {

    this.pubgService.getTournaments().subscribe(data=>{
      this.tournaments = data['data'];
      console.log(this.tournaments);
    })
  }

}
