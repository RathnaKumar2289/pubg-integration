import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/pubg/components/dashboard/dashboard.component';
import { MatchesComponent } from 'src/app/modules/pubg/components/matches/matches.component';
import { MatchDetailsComponent } from 'src/app/modules/pubg/components/match-details/match-details.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { RegisterComponent } from './modules/authentication/components/register/register.component';
import { FavouriteListComponent } from './modules/pubg/components/favourite-list/favourite-list.component';
import { AuthGuardService } from './modules/pubg/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "tournaments",
    component: DashboardComponent
  },
  {
    path: "matches/:tournamentId",
    component: MatchesComponent
  },
  {
    path: "match/:matchId",
    component: MatchDetailsComponent
  },
  {
    path: "favouritelist",
    component: FavouriteListComponent,
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
