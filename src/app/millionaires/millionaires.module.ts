import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { MillionairesRoutingModule } from './millionaires-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { MillionairesRestService } from './services/millionaires.rest.service';

@NgModule({
  declarations: [WelcomeScreenComponent, StepperComponent, DialogComponent],
  imports: [
    CommonModule,
    MillionairesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    MillionairesRestService,
  ]
})
export class MillionairesModule { }
