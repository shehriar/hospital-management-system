import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './patient-portal/home/home.component';
import { BookAppointmentComponent } from './patient-portal/book-appointment/book-appointment.component';
import { LoginComponent } from './patient-portal/login/login.component';
import { SignupComponent } from './patient-portal/signup/signup.component';
import { MyAppointmentsComponent } from './patient-portal/my-appointments/my-appointments.component';
import { DiagnosesComponent } from './patient-portal/diagnoses/diagnoses.component';
import { MedicationComponent } from './patient-portal/medication/medication.component';
import { DoctorHomeComponent } from './doctor-portal/home/home.component';
import { DoctorLoginComponent } from './doctor-portal/doctor-login/doctor-login.component';
import { DoctorSignupComponent } from './doctor-portal/doctor-signup/doctor-signup.component';
import { AppointmentsComponent } from './doctor-portal/appointments/appointments.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'book-appointment', component: BookAppointmentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'appointments', component: MyAppointmentsComponent},
  {path: 'diagnoses', component: DiagnosesComponent},
  {path: 'medication', component: MedicationComponent},
  {path: 'doctor', component: DoctorHomeComponent},
  {path: 'doctor/login', component: DoctorLoginComponent},
  {path: 'doctor/signup', component: DoctorSignupComponent},
  {path: 'doctor/appointments', component: AppointmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
