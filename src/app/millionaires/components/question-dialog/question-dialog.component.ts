import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContinueOrQuitDialog } from '../stepper/stepper.component';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ContinueOrQuitDialog) {}
}

