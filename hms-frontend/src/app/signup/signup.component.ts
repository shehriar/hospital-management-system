import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientDetails } from '../interfaces/patient-details';
import { PatientDetailsService } from '../services/patient-details.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  patientDetails! : PatientDetails;
  day : any;
  month : any;
  year : any;
  constructor(private router:Router, private patientService : PatientDetailsService){
    this.patientDetails = {
      name: '',
      email: '',
      password: '',
      phone: '',
      dob: ''
    };
  }

  onButtonClick(path:string){
    this.router.navigateByUrl(path);
  }

  onSubmit(){
    this.populateUserDetails();
    this.patientService.submitPatientDetails(this.patientDetails).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  populateUserDetails(){
    this.patientDetails.name = (document.getElementById("fullname") as HTMLInputElement).value;
    this.patientDetails.email = (document.getElementById("email") as HTMLInputElement).value;
    this.day = (document.getElementById("day") as HTMLInputElement).value;
    this.month = (document.getElementById("month") as HTMLInputElement).value;
    this.year = (document.getElementById("year") as HTMLInputElement).value;

    if(parseInt(this.day, 10) < 10 && this.day[0] != '0'){
      this.day = '0' + this.day;
      console.log(this.day);
    }

    if(parseInt(this.month, 10) < 10 && this.month[0] != '0'){
      this.month = '0' + this.month;
      console.log(this.month);
    }
    
    this.patientDetails.dob = this.year + "-" + this.month + "-" + this.day;

    this.patientDetails.password = (document.getElementById("password") as HTMLInputElement).value;
    this.patientDetails.phone = (document.getElementById("phone") as HTMLInputElement).value;
  }
}
