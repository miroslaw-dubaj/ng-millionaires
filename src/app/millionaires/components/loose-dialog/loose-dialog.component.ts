import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContinueOrQuitDialog } from '../stepper/stepper.component';

@Component({
  selector: 'app-loose-dialog',
  templateUrl: './loose-dialog.component.html',
  styleUrls: ['./loose-dialog.component.scss']
})
export class LooseDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ContinueOrQuitDialog) {}
}

