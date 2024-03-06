import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './patient-portal/home/home.component';
import { BookAppointmentComponent } from './patient-portal/book-appointment/book-appointment.component';
import { LoginComponent } from './patient-portal/login/login.component';
import { SignupComponent } from './patient-portal/signup/signup.component';
import { MyAppointmentsComponent } from './patient-portal/my-appointments/my-appointments.component';
import { DiagnosesComponent } from './patient-portal/diagnoses/diagnoses.component';
import { MedicationComponent } from './patient-portal/medication/medication.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'book-appointment', component: BookAppointmentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'appointments', component: MyAppointmentsComponent},
  {path: 'diagnoses', component: DiagnosesComponent},
  {path: 'medication', component: MedicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
