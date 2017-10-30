import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  backgroundImageUrl = "assets/Images/login-bg.png";
  logoIconUrl = "assets/Logos/kplogo.png"
  constructor() { }

  ngOnInit() {
  }

}
