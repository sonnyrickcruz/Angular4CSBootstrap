import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User, Employee } from '../../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logoIconUrl = "assets/Logos/kplogo.png"

  username: string;
  password: string;

  employee: Employee;

  invalidInput: boolean;
  message = "A";
  messageEmpty = "Username or password is empty";
  messageInvalid = "Incorrect username or password"

  constructor(private _userService: UserService,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/home']);
    }
  }

  login() {
    this.invalidInput = false;
    let isNotEmpty = this.username != null && this.username != '';
    if (!this._authService.isAuthenticated() && isNotEmpty) {
      this._userService.login(this.username, this.password).subscribe(
        (data) => {
          this.employee = data;
          this.processLoginResponse();
        },
        (err) => {
          console.log(err)
          this.invalidInput = true;
          if (err.status != "500") {
            if (typeof err._body != "object") {
              this.message = err._body;
            } else {
              this.message = "System not available. Please try again later."
            }
          } else {
            this.message = err.statusText + ". Please try again later."
            console.log(err)
          }
        });
    } else if (!isNotEmpty) {
      this.invalidInput = true;
      this.message = this.messageEmpty;
    }
    if (this.invalidInput) {
      this.username = "";
      this.password = "";
    }
  }

  processLoginResponse() {
    let user: User;
    if (this.employee != null) {
      user = {
        "username": this.username,
        "employee": this.employee
      }
      user = this._userService.getUserByUserName("sonny.cruz");
      console.log(JSON.stringify(this.employee));
      this._authService.login(user);
    }
    if (this._authService.getUser()) {
      this._router.navigate(['/home']);
    } else {
      this.invalidInput = true;
      this.message = this.messageInvalid;
    }
  }
}