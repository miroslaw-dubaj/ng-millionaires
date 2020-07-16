import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(){}

  decode64(data: string) {
    return atob(data);
  }

  encode64(data: string) {
    return btoa(data);
  }
}
