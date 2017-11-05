import { Component, OnInit } from '@angular/core';
import { User } from '../../models/employee';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.getUserByUserName('gian.liwanag');
    console.log(JSON.stringify(this.user));
  }

}
