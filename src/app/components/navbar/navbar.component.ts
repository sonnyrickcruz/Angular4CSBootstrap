import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/employee';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';

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
    private _userService: UserService,
    private _imageService: ImageService) { }

  ngOnInit() {
    this.user = this._auth.getUser();
    if (this._auth.isAuthenticated() && this.user && this.user.username) {
      this._router.events.subscribe((url: any) => this.showNav = !url.url.includes("/login"));
      this.profileImgUrl = this._imageService.getUserImage(this.user.username);
    } else {
      // Fix nav not displaying on route redirect
      this._router.events.subscribe((url: any) => {
        if (!url.url.includes("/login")) {
          location.reload();
          this._router.navigate(['/login']);
        }
      }
      );
    }
  }

  setDefaultPic() {
    this.profileImgUrl = this.defaultImgUrl;
  }

  getImageUrl(name: string) {
    return "assets/Images/Users/" + name.replace(/[\. ,:-]+/g, '-').toLowerCase() + ".png";
  }

  logout() {
    console.log("LOGOUT")
    this._auth.logout();
    this._router.navigate(['/login']);
  }

  burgerClick() {
    if (this.triggerNav) {
      this.triggerNav = false;
    } else {
      this.triggerNav = true;
    }
  }
}
