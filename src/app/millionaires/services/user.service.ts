import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _playerName: string;
  private _userName: string;

  constructor() { }

  set playerName(name) {
    this._playerName = name;
  }

  get playerName() {
    return this._playerName;
  }

  set userName(name) {
    this._userName = name;
  }

  get userName() {
    return this._userName;
  }
}
