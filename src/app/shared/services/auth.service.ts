import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected authorized: boolean = false;

  constructor() { }

  get isUserAuth() {
    return this.authorized;
  }

  set isUserAuth(status: boolean) {
    this.authorized = status;
  }
}
