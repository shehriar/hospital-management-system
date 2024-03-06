import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './patient-portal/home/home.component';
import { BookAppointmentComponent } from './patient-portal/book-appointment/book-appointment.component';
import { LoginComponent } from './patient-portal/login/login.component';
import { SignupComponent } from './patient-portal/signup/signup.component';
import { PatientDetailsService } from './patient-portal/services/patient-details.service';
import { HttpClientModule } from '@angular/common/http';
import { MyAppointmentsComponent } from './patient-portal/my-appointments/my-appointments.component';
import { DiagnosesComponent } from './patient-portal/diagnoses/diagnoses.component';
import { MedicationComponent } from './patient-portal/medication/medication.component';
import { DoctorLoginComponent } from './doctor-portal/doctor-login/doctor-login.component';
import { DoctorSignupComponent } from './doctor-portal/doctor-signup/doctor-signup.component';
import { DoctorHomeComponent } from './doctor-portal/home/home.component';
import { AppointmentsComponent } from './doctor-portal/appointments/appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookAppointmentComponent,
    LoginComponent,
    SignupComponent,
    MyAppointmentsComponent,
    DiagnosesComponent,
    MedicationComponent,
    DoctorHomeComponent,
    DoctorLoginComponent,
    DoctorSignupComponent,
    AppointmentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PatientDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
