import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PubgModule } from 'src/app/modules/pubg/pubg.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HttpErrorService } from './http-error.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PubgModule,
    AuthenticationModule
  ],
  providers: [HttpErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
