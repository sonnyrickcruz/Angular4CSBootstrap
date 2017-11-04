import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
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
    let user;
    if (!this._authService.isAuthenticated()) {
      if (this.username != null && this.username != '' && this.password == 'test') {
        user = this._userService.getUserByUserName(this.username);
      }
      if (user != null) {
        console.log(JSON.stringify(user));
        this._authService.login(user);
        console.log(this._authService.isAuthenticated());
      }
    }
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/home']);
    }
  }

}