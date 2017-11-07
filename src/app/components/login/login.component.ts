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
  backgroundImageUrl = "assets/Images/login-bg.png";
  logoIconUrl = "assets/Logos/kplogo.png"
  
  username: string;
  password: string;

  user:Employee;

  invalidInput: boolean;
  message = "A";
  messageEmpty = "Username or password is empty";
  messageInvalid = "Incorrect username or password"

  constructor(private _userService: UserService,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
    console.log(this._authService.isAuthenticated());
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/home']);
    }
  }

  login() {
    let user: User;
    let isNotEmpty = this.username != null && this.username != '';
    if (!this._authService.isAuthenticated() && isNotEmpty) {
      this._userService.login(this.username, this.password).subscribe((data) => {
        this.user = {
            "name": data.name,
            "nickName": data.nickName,
            "role": data.role,
            "businessGroupObject": data.businessGroupObject
        }
      });
      console.log(JSON.stringify(this.user))
      if (this.password == 'test') {
        user = this._userService.getUserByUserName(this.username);
      }
      if (user != null) {
        console.log(JSON.stringify(user));
        this._authService.login(user);
      }
    }
    if (this._authService.isAuthenticated()) {
      //this._router.navigate(['/home']);
    } else if (!isNotEmpty) {
      this.invalidInput = true;
      this.message = this.messageEmpty;
    } else {
      this.invalidInput = true;
      this.message = this.messageInvalid;
    }
  }
}