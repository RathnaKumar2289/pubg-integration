import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonModule, Location } from "@angular/common";
import { AngularmaterialModule } from "src/app/modules/angularmaterial/angularmaterial.module";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "src/app/app-routing.module";
import { RegisterComponent } from "../register/register.component";
import { DashboardComponent } from "src/app/modules/pubg/components/dashboard/dashboard.component";
import { MatchesComponent } from "src/app/modules/pubg/components/matches/matches.component";
import { HeaderComponent } from "src/app/modules/pubg/components/header/header.component";
import { MatchDetailsComponent } from "src/app/modules/pubg/components/match-details/match-details.component";
import { FavouriteListComponent } from "src/app/modules/pubg/components/favourite-list/favourite-list.component";
import { CardComponent } from "src/app/modules/pubg/components/card/card.component";
import { MatSnackBar } from "@angular/material";
import { Router, Routes } from "@angular/router";
import { AuthenticationService } from "../../authentication.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs/internal/observable/of";
import { throwError } from "rxjs";

export const TOKEN_NAME = "jwt_token";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let authService: AuthenticationService;
  let snackBar: MatSnackBar;
  let router: Router;
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        MatchesComponent,
        MatchDetailsComponent,
        HeaderComponent,
        FavouriteListComponent,
        CardComponent
      ],
      imports: [
        CommonModule,
        AngularmaterialModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
        
      ],
      providers: [AuthenticationService
       ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    let store = { jwt_token: "1234" };
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = { jwt_token: null };
      }
    };
    spyOn(localStorage, "getItem").and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, "setItem").and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, "removeItem").and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, "clear").and.callFake(mockLocalStorage.clear);
    fixture.detectChanges();
  });

  it("Login Success", () => {
    const data = { token: "1234", message: "User Successfully LoggedIn!!" };
    authService = TestBed.get(AuthenticationService);   
    let spyService = spyOn(authService, "loginUser").and.returnValue(of(data));
    let userId = fixture.debugElement.query(By.css("#username")).nativeElement;
    let password = fixture.debugElement.query(By.css("#password"))
     .nativeElement;
    let loginButton = fixture.debugElement.query(By.css(".login-click"))
      .nativeElement;
    userId.value = "test";
    password.value = "test";
    loginButton.click();
    fixture.detectChanges();
    expect(spyService).toHaveBeenCalled();
    expect(localStorage.getItem("jwt_token")).toEqual("1234");
  });

  it("Login failure ", () => {
    const data = '{ "status": 409, "error":{"message":"Invalid Credential!!"}}';
    authService = TestBed.get(AuthenticationService);
    let spyService = spyOn(authService, "loginUser").and.returnValue(
      throwError(new Error(data))
    );
    let userId = fixture.debugElement.query(By.css("#username")).nativeElement;
    let password = fixture.debugElement.query(By.css("#password"))
      .nativeElement;
    let loginButton = fixture.debugElement.query(By.css(".login-click"))
      .nativeElement;
    userId.value = "test";
    password.value = "test";
    loginButton.click();
    expect(spyService).toHaveBeenCalled();
  });
});
