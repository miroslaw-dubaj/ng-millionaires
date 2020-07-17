import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { GameService, Stake } from '../../services/game.service';
import { MatStepper } from '@angular/material/stepper';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LooseDialogComponent } from '../loose-dialog/loose-dialog.component';
import { filter } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnDestroy {

  public form: FormArray = new FormArray([]);
  public currentGuaranteed: string;

  @ViewChild('stepper') stepperRef: MatStepper;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public gameService: GameService,
    public userService: UserService,
  ) {
    this.gameService.getFormControls().subscribe(data => {
      this.form = new FormArray(data)
    });

    this.gameService.getGuaranteed().subscribe(amount => this.currentGuaranteed = amount)
  }

  verification(i: number, stepper: MatStepper) {
    if (stepper !== undefined) {

      const dialogRef = this.dialog.open(QuestionDialogComponent, {
        data: {
          stake: this.gameService.getStakes()[i],
          currentGuaranteed: this.currentGuaranteed,
          nextPrize: this.gameService.getStakes()[i + 1]
            ? this.gameService.getStakes()[i + 1]
            : this.gameService.getStakes()[i],
          user: this.userService.playerName
        }
      }
      );

      dialogRef.afterClosed().pipe(
      ).subscribe(result => {
        if (result && this.form.controls[i].value.radio === this.gameService.getCorrectAnswer(i)) {

          if (this.gameService.getStakes()[i].guaranteed) {
            this.gameService.setGuaranteed(this.gameService.getStakes()[i].amount)
            this.gameService.setCurrentQuestion(i + 1);
          }

          stepper.next();

        } else {
          const dialogRef = this.dialog.open(LooseDialogComponent, {
            data: {
              currentGuaranteed: this.currentGuaranteed,
              user: this.userService.playerName
            }
          });
          
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.restartGame();
            } else {
              this.userService.playerName = '';
              this.router.navigate(['/']);
            }
          });
        }
      });
    }
  }

  restartGame() {
    this.stepperRef.reset();
    this.gameService.restartGame();
  }

  ngOnDestroy() {
    this.restartGame();
  }
}

export interface ContinueOrQuitDialog {
  stake?: Stake;
  currentGuaranteed?: string;
  nextPrize?: Stake;
  user?: string;
}

