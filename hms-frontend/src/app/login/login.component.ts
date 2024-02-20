import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientDetailsService } from '../services/patient-details.service';
import { PatientDetails } from '../interfaces/patient-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email! : string;
  password! : string;
  patientDetails! : PatientDetails;
  loginFailed : boolean = false;
  constructor(private router:Router, private patientService : PatientDetailsService){
    this.patientDetails = {
      id: 0,
      name: '',
      email: '',
      password: '',
      phone: '',
      dob: ''
    };
  }

  populateLoginInfo(){
    this.email = (document.getElementById("email") as HTMLInputElement).value;
    this.password = (document.getElementById("password") as HTMLInputElement).value;
    this.patientService.submitLoginDetails([this.email, this.password]).subscribe({
      next: (response) => {
        if(response.length == 0){
          this.loginFailed = true;
        }
        else{
          this.loginFailed = false;
          this.populatePatientDetails(response[0]);
          this.onButtonClick('');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  populatePatientDetails(user : any){
    let id : any;
    this.patientService.getPatientID(this.email).subscribe({
      next: (response) => {
        id = response['Patient_id'];
        this.patientDetails = {
          id : id,
          name : user['patient_name'],
          email : user['patient_email'],
          password: user['patient_password'],
          phone: user['phone'],
          dob: user['dob'],
        }
        this.patientService.setPatientDetails(this.patientDetails);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSubmit(){
    this.populateLoginInfo();
  }

  onButtonClick(path:string){
    this.router.navigateByUrl(path);
  }
}
