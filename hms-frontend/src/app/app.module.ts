import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PatientDetailsService } from './services/patient-details.service';
import { HttpClientModule } from '@angular/common/http';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { DiagnosesComponent } from './diagnoses/diagnoses.component';
import { MedicationComponent } from './medication/medication.component';

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
