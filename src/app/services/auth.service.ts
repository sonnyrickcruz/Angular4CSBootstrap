import { Injectable } from '@angular/core';
import { User } from '../models/employee';

@Injectable()
export class AuthService {
  private static _authenticated = false;
  private static _user;
  login(user:User) {
    if (user != null) {
      AuthService._user=user;
      AuthService._authenticated = true;
    }
  }
  isAuthenticated() {
    return AuthService._authenticated;
  }
  getUser(): User {
    return AuthService._user;
  }
  logout(): void {
    AuthService._authenticated = false;
  }

}
