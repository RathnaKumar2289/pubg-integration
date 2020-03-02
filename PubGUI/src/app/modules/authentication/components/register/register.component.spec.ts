import { async, ComponentFixture, TestBed, fakeAsync,tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from 'src/app/modules/angularmaterial/angularmaterial.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from '../../authentication.service';
import { LoginComponent } from '../login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { of } from "rxjs/internal/observable/of";
import {Location} from "@angular/common";
import { MatSnackBar } from '@angular/material';
const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['registerUser']);

describe('RegisterComponent', () => {
  let component: RegisterComponent;
let snackBar: MatSnackBar;
  beforeEach(async(() => {
    component = new RegisterComponent(authServiceSpy, snackBar, routerSpy);
  }));
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.user.userName).toBeUndefined();
    expect(component.user.email).toBeUndefined();
    expect(component.user.password).toBeUndefined();
  });
});


describe('Register Component  Test', () => {

  let fixture: ComponentFixture<RegisterComponent>;
  let component:RegisterComponent;
  let authSpy;
  let router:Router;
  let location:Location;
  function updateForm(userName,userEmail, userPassword) {
    component.user.userName = userName;
    component.user.email = userEmail;
    component.user.password = userPassword;
  }
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }

  
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        AngularmaterialModule,        
        CommonModule,
        FormsModule,
      RouterTestingModule],
      providers: [
        {provide: AuthenticationService, useValue: authServiceSpy}
        
        
      ],
      declarations: [RegisterComponent,LoginComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  
   
  }));


  it('should Register with User Details', fakeAsync(() => {
    const data = { "status": 201, "message":"Registered Successfully!!"};
    updateForm('test', 'test@gmail.com','test123');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.register-user');
    button.click();
    advance(fixture);

    authSpy = authServiceSpy.registerUser.and.returnValue(of(data));
    
    expect(component.user.userName).toEqual("test");
    expect(component.user.email).toEqual("test@gmail.com");
    expect(component.user.password).toEqual("test123");
    expect(authSpy).toHaveBeenCalled();
  }));
 
});
