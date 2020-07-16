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
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';

import { MillionairesRestService } from './services/millionaires.rest.service';
import { LooseDialogComponent } from './components/loose-dialog/loose-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    WelcomeScreenComponent,
    StepperComponent,
    QuestionDialogComponent,
    LooseDialogComponent,
    NavbarComponent
  ],
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
    MatIconModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [
    MillionairesRestService,
    UserService,
  ]
})
export class MillionairesModule { }
