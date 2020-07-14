import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Question } from '../../services/millionaires.rest.service';
import { MatStepper } from '@angular/material/stepper';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  form: FormArray = new FormArray([]);
  questions: Question[] = [];
  mixedAnswers: string[][] = []
  stakes: Stake[] = [
    { amount: '500 PLN', guaranteed: false },
    { amount: '1000 PLN', guaranteed: true },
    { amount: '2000 PLN', guaranteed: false },
    { amount: '5000 PLN', guaranteed: false },
    { amount: '10 000 PLN', guaranteed: false },
    { amount: '20 000 PLN', guaranteed: false },
    { amount: '40 000 PLN', guaranteed: true },
    { amount: '75 000 PLN', guaranteed: false },
    { amount: '125 000 PLN', guaranteed: false },
    { amount: '250 000 PLN', guaranteed: false },
    { amount: '500 000 PLN', guaranteed: false },
    { amount: '1 000 000 PLN', guaranteed: false }
  ];
  currentGuaranteed: string;

  constructor(
    private gameService: GameService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.gameService.startNewGame();
    this.gameService.getGameStatus()
      .subscribe(data => data.questions
        .forEach(question => {
          const mixedAnswers = [...question.question.incorrect_answers]

          Math.floor(Math.random() * 4) > 2
            ? mixedAnswers.push(question.question.correct_answer)
            : mixedAnswers.splice(Math.floor(Math.random() * 4), 0, question.question.correct_answer);

          this.mixedAnswers.push(mixedAnswers);
          this.questions.push(question.question);

          this.form.push(new FormGroup({
            radio: new FormControl('', Validators.required)
          }));
        })
      );
  }

  verification(i: number, stepper: MatStepper) {
    if (stepper !== undefined) {

      const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            stake: this.stakes[i],
            currentGuaranteed: this.currentGuaranteed,
            nextPrize: this.stakes[i+1] ? this.stakes[i+1] : this.stakes[i]
          }
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result && this.form.controls[i].value.radio === this.questions[i].correct_answer) {
          this.currentGuaranteed = this.stakes[i].guaranteed ? this.stakes[i].amount : this.currentGuaranteed

          // const dialogRef = this.dialog.open(DialogComponent);
  
          // dialogRef.afterClosed().subscribe(result => {
          //   console.log(`Dialog result: ${result}`);
          // });

          stepper.next();
        } 
      });
      
    }
  }

  restartGame(stepper: MatStepper) {
    this.gameService.startNewGame();
    stepper.reset()
  }
}

export interface ContinueOrQuitDialog {
  stake: Stake;
  currentGuaranteed: string;
  nextPrize: Stake;
}

export interface Stake {
  amount: string;
  guaranteed: boolean;
}