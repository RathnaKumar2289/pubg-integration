import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthenticationService', () => {
  let authService :AuthenticationService
  beforeEach(() => {TestBed.configureTestingModule({
     imports: [
      HttpClientTestingModule
  ],
  providers: [ AuthenticationService ]
});
authService = TestBed.get(AuthenticationService);
});

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('expects service to Register User',
  inject([HttpTestingController, AuthenticationService],
    (httpMock: HttpTestingController, service: AuthenticationService) => {
      const data = {userName:"test","email":"test@gmail.com","password":"test123"};
     
      service.registerUser(data).subscribe(data => {
        expect(data.status).toBe(201);
        expect(data.statusText).toBe("Created");
        expect(data.body["message"]).toBe("Registered Successfully!!");
      });
      
      const req = httpMock.expectOne('http://localhost:8084/api/v1/authenticationservice/save');
      expect(req.request.method).toEqual('POST');
     
      req.flush({message:"Registered Successfully!!"},{status:201,statusText:"Created"});
    }));

    it('expects service to Register Duplicate User',
    inject([HttpTestingController, AuthenticationService],
      (httpMock: HttpTestingController, service: AuthenticationService) => {
        const data = {userName:"test","email":"test@gmail.com","password":"test123"};
       
        service.registerUser(data).subscribe(data => {
          expect(data.status).toBe(409);
          expect(data.body["message"]).toBe("User Already Exists!!");
        });
        
        const req = httpMock.expectOne('http://localhost:8084/api/v1/authenticationservice/save');
        expect(req.request.method).toEqual('POST');
       
        req.flush({message:"User Already Exists!!"},{status:409,statusText:"Conflict"});
      }));

    it('expects service to Login User',
    inject([HttpTestingController, AuthenticationService],
      (httpMock: HttpTestingController, service: AuthenticationService) => {
        const data = {userName:"test","email":"test@gmail.com","password":"test123"};
       
        service.loginUser(data).subscribe(data => {
          expect(data.status).toBe(200);
          expect(data.body["message"]).toBe("Login Success!!");
        });
        
        const req = httpMock.expectOne('http://localhost:8084/api/v1/authenticationservice/login');
        expect(req.request.method).toEqual('POST');
       
        req.flush({message:"Login Success!!"});
      }) );

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
      httpMock.verify();
    }));

});
