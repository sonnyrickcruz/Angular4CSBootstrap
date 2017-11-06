import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/employee';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNav: boolean;
  url: string;
  user: User;
  profileImgUrl;
  triggerNav = false;
  defaultImgUrl = "/assets/Images/transparent2.png";
  constructor(private _router: Router,
              private _auth: AuthService,
              private _userService: UserService) { }

  ngOnInit() {
    this._router.events.subscribe((url: any) => this.showNav = !url.url.includes("/login"));
    console.log(JSON.stringify(this._auth.getUser()))
    if (this._auth.isAuthenticated()) {
      //this.user = this._auth.getUser();
    }
    this.user = this._userService.getUserByUserName('gian.liwanag');
    this.profileImgUrl = this.getImageUrl(this.user.username);
  }

  setDefaultPic() {
    this.profileImgUrl = this.defaultImgUrl;
  }
  
  getImageUrl(name: string) {
    return "assets/Images/Users/" + name.replace(/[\. ,:-]+/g, '-').toLowerCase() + ".png";
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['/home']);
  }

  burgerClick() {
    if (this.triggerNav) {
      this.triggerNav = false;
    } else {
      this.triggerNav = true;
    }
  }
}
