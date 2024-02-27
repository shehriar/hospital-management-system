import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'book-appointment', component: BookAppointmentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'appointments', component: MyAppointmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
