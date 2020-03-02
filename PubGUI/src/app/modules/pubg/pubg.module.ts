import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularmaterialModule } from '../../modules/angularmaterial/angularmaterial.module';
import { PubgService } from '../../modules/pubg/pubg.service';
import { PubgInterceptorService } from '../../modules/pubg/pubginterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { AppRoutingModule } from '../../app-routing.module';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FavouriteListComponent } from './components/favourite-list/favourite-list.component';
import { DialogComponent } from './components/dialog/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [DashboardComponent, MatchesComponent, MatchDetailsComponent, CardComponent,
     HeaderComponent, FooterComponent, FavouriteListComponent, DialogComponent],
  imports: [
    CommonModule,
    AngularmaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule
  ],

  exports:[HeaderComponent,FooterComponent],
  providers:[    
    PubgService,{
      provide: HTTP_INTERCEPTORS,
      useClass: PubgInterceptorService,
      multi: true      
    }
    
  ],
  entryComponents: [
    DialogComponent
  ]

})
export class PubgModule { }
