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
  email : any;

  // True if no error.
  nameError = true;
  emailError = true;
  dobError = true;
  passwordError = true;
  phoneError = true;

  // True if duplicate
  duplicateEmail = false;

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

  onButtonClick(path:string){
    this.router.navigateByUrl(path);
  }

  // Checks for errors => Populates the user details => Receives and saves the ID of user => Sets Patient Detials in Service
  onSubmit(){
    if(this.errorChecking()){
      this.populateUserDetails();
      this.patientService.setPatientDetails(this.patientDetails);
      this.patientService.submitPatientDetails(this.patientDetails).subscribe({
        next: (response) => {
          let id : any;
          this.patientService.getPatientID(this.email).subscribe({
            next: (response) => {
              id = response['Patient_id'];
              this.patientDetails.id = id;
              this.patientService.setPatientDetails(this.patientDetails);
            },
            error: (error) => {
              console.error(error);
            }
          });
          this.duplicateEmail = !response;
          if(!this.duplicateEmail){
            this.onButtonClick('');
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  populateUserDetails(){
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
    this.patientDetails.id = 0;
    this.patientDetails.name = (document.getElementById("fullname") as HTMLInputElement).value;
    this.patientDetails.email = (document.getElementById("email") as HTMLInputElement).value;
    this.patientDetails.password = (document.getElementById("password") as HTMLInputElement).value;
    this.patientDetails.phone = (document.getElementById("phone") as HTMLInputElement).value;
  }

  errorChecking() : boolean{
    this.nameError = this.errorCheckName();
    this.emailError = this.errorCheckEmail();
    this.dobError = this.errorCheckDOB();
    this.passwordError = this.errorCheckPassword();
    this.phoneError = this.errorCheckPhone();

    if(this.nameError && this.emailError && this.dobError && this.passwordError && this.phoneError){
      return true;
    }
    return false;
  }

  errorCheckName() : boolean{
    let name = (document.getElementById("fullname") as HTMLInputElement).value;
    for(let i = 0; i<name.length; i++){
      if(name[i] == ' '){
        return true;
      }
    }
    return false;
  }

  errorCheckEmail() : boolean{
    this.email = (document.getElementById("email") as HTMLInputElement).value;
    for(let i = 0; i<this.email.length; i++){
      if(this.email[i] == '@'){
        for(let j = i; j<this.email.length; j++){
          if(this.email[j] == '.'){
            return true;
          }
        }
      }
    }
    return false;
  }

  errorCheckDOB() : boolean{
    let day = (document.getElementById("day") as HTMLInputElement).value;
    let month = (document.getElementById("month") as HTMLInputElement).value;
    let year = (document.getElementById("year") as HTMLInputElement).value;
    if(day == "" || month == "" || year == ""){
      return false;
    }
    let dayInt = parseInt(day, 10);
    let monthInt = parseInt(month, 10);
    let yearInt = parseInt(year, 10);

    if(dayInt < 1 || dayInt > 31){
      return false;
    }
    if(monthInt < 1 || monthInt > 12){
      return false;
    }
    if(yearInt < 1900 || yearInt > 2024){
      return false;
    }
    return true;
  }

  errorCheckPassword() : boolean{
    let password = (document.getElementById("password") as HTMLInputElement).value;
    let confirmPassword = (document.getElementById("cpassword") as HTMLInputElement).value;
    if(password != confirmPassword || password.length == 0){
      return false;
    }
    return true;
  }

  errorCheckPhone() : boolean{
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    if(phone.length < 9 || phone.length > 11){
      return false;
    }
    return true;
  }
}
