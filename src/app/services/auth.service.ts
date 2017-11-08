import { Injectable } from '@angular/core';
import { User } from '../models/employee';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthService {
  private static _authenticated = false;
  private static _user;
  constructor(private _sessionStorage:SessionStorageService) {}

  login(user:User) {
    if (user != null) {
      this._sessionStorage.store('user', user);
      this._sessionStorage.retrieve('user');
    }
  }
  isAuthenticated() {
    this.processSession();
    return AuthService._authenticated;
  }
  getUser(): User {
    this.processSession()
    return AuthService._user;
  }
  logout(): void {
    this._sessionStorage.clear('user');
    AuthService._authenticated = false;
  }

  processSession() {
    let user = this._sessionStorage.retrieve('user');
    if (user) {
      AuthService._user = user;
      AuthService._authenticated = true;
    }
  }

}
