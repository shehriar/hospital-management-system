import { Component } from '@angular/core';
import { DoctorDetails } from '../interfaces/doctor-details';
import { Router } from '@angular/router';
import { DoctorDetailsService } from '../services/doctor-details.service';

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css']
})
export class DoctorSignupComponent {
  doctorDetails! : DoctorDetails;
  // True if no error.
  nameError = true;
  emailError = true;
  passwordError = true;
  phoneError = true;

  email! : string;

  // True if duplicate
  duplicateEmail = false;
  constructor(private router : Router, private doctorService : DoctorDetailsService){
    this.doctorDetails = {
      id: 0,
      name: '',
      email: '',
      password: '',
      phone: '',
    }
  }

  onButtonClick(path:string){
    this.router.navigateByUrl(path);
  }

  onSubmit(){
    if(this.errorChecking()){
      this.populateUserDetails();
      this.doctorService.setDoctorDetails(this.doctorDetails);
      this.doctorService.submitDoctorDetails(this.doctorDetails).subscribe({
        next: (response) => {
          let id : any;
          this.doctorService.getDoctorID(this.email).subscribe({
            next: (response) => {
              id = response['doctor_id'];
              this.doctorDetails.id = id;
              this.doctorService.setDoctorDetails(this.doctorDetails);
            },
            error: (error) => {
              console.error(error);
            }
          });
          this.duplicateEmail = !response;
          if(!this.duplicateEmail){
            this.onButtonClick('doctor');
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  populateUserDetails(){
    this.doctorDetails.id = 0;
    this.doctorDetails.name = (document.getElementById("fullname") as HTMLInputElement).value;
    this.doctorDetails.email = (document.getElementById("email") as HTMLInputElement).value;
    this.doctorDetails.password = (document.getElementById("password") as HTMLInputElement).value;
    this.doctorDetails.phone = (document.getElementById("phone") as HTMLInputElement).value;
  }

  errorChecking() : boolean{
    this.nameError = this.errorCheckName();
    this.emailError = this.errorCheckEmail();
    this.passwordError = this.errorCheckPassword();
    this.phoneError = this.errorCheckPhone();

    if(this.nameError && this.emailError && this.passwordError && this.phoneError){
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
