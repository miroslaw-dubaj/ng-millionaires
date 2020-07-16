import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/millionaires/services/user.service';
import { Router } from '@angular/router';
import { StorageService, GamesStorage } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private userService: UserService,
    private router: Router,
    private storage: StorageService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  userLogin(formValues: { login: string, password: string }) {
    if (formValues.login && formValues.password) {
      const storageData: GamesStorage = this.storage.getItem('games');
      const game = storageData.games.find(u => u.userName == formValues.login)  
      if (game.password == formValues.password) {
        this.auth.isUserAuth = true;
      } else {
        const currentGameIndex = storageData.games.findIndex(game => game.userName == null);
        storageData.games[currentGameIndex].userName = formValues.login;
        storageData.games[currentGameIndex].password = formValues.password;
        this.storage.setItem('games', storageData);
      }
      
    } else {
      this.form.markAsDirty()
    }
  }

}
