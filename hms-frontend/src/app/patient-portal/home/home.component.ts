import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PatientDetailsService } from '../services/patient-details.service';
import { PatientDetails } from '../interfaces/patient-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  patientDetails! : PatientDetails;
  loggedIn : boolean = false;
  constructor(private router: Router, private patientService : PatientDetailsService){
    this.patientService.patientDetails.subscribe(patient => {
      if(patient){
        this.patientDetails = patient;
        this.loggedIn = true;
      }
      else{
        this.loggedIn = false;
        this.patientDetails = {
          id : 0,
          name : "",
          email : "",
          dob : "",
          phone : "",
          password : "",
        }
      }
    })
  }
  onButtonClick(path : string){
    this.router.navigateByUrl(path);
  }

  logout(){
    this.patientService.logout();
  }
}
