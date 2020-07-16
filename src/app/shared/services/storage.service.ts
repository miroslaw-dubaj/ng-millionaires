import { Injectable } from '@angular/core';
import { CommonService } from './common.service'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private commonService: CommonService) { }

  setItem(key: string, data: any) {
    // localStorage.setItem(key, this.commonService.encode64(JSON.stringify(data)));
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string): any {
    // return JSON.parse(this.commonService.decode64(localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key));
  }
}

export interface GamesStorage {
  games: GameStorage[];
}

export interface GameStorage {
  userName: string;
  password: string;
  gameData: any;
}