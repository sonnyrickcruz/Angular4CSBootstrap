import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserServiceService {

  MOCK_USERS: User[] = [{
    "username": "gian.liwanag",
    "employee": {
      "name": "Liwanag, Gian Carlo B.",
      "nickName": null,
      "role": { "roleName": "Software Developer" },
      "businessGroupObject": { "businessGroup": "Banking and Retail", "businessGroupCode": "BR" }
    }
  }, {
    "username": "sonny.cruz",
    "employee": {
      "name": "Cruz, Sonny Rick B.",
      "nickName": null,
      "role": { "roleName": "Software Developer" },
      "businessGroupObject": { "businessGroup": "Transportation and Logistics", "businessGroupCode": "T&L" }
    }
  }
  ]
  constructor() { }

  getUserByUserName(username: string) {
    this.MOCK_USERS.forEach(user => {
      if (user.username === username)
        return user;
    });
  }
}
