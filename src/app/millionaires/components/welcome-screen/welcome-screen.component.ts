import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent {

  public form: FormGroup = new FormGroup({name: new FormControl('', Validators.required)});
  
  constructor(private router: Router, private userService: UserService) {}

  startGame(value: {name: string}) {
    if (value.name) {
      this.userService.playerName = value.name;
      this.router.navigate(['/millionaires']);
    } else {
      this.form.get('name').markAsDirty()
    }
  }
}
