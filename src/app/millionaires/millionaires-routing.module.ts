import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {path: '', component: NavbarComponent,
    children: [
      {path: '', pathMatch: 'full', component: WelcomeScreenComponent},
      {path: 'millionaires', component: StepperComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MillionairesRoutingModule { }
