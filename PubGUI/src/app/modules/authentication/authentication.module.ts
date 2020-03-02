import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularmaterialModule } from '../angularmaterial/angularmaterial.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AngularmaterialModule,
    FormsModule,
    AppRoutingModule

  ]
})
export class AuthenticationModule { }
