import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { AuthenticationService } from '../../authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  constructor(private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.user = new User();
  }


  ngOnInit() {
  }


  register() {
    console.log(this.user);
    this.authService.registerUser(this.user).subscribe(
      data => {
        if (data.status === 201) {
          this.snackBar.open(data.body["message"], " ", {
            duration: 1000
          });
        }
        this.router.navigate(["/login"]);
      },
      error => {
        if (error.status === 409) {
          const errorMsg = error.error.message;
          this.snackBar.open(errorMsg, "", {
            duration: 3000
          });
        }
      });
  }


}
