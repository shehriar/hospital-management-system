import { Component } from '@angular/core';
import { DoctorDetails } from '../interfaces/doctor-details';
import { DoctorDetailsService } from '../services/doctor-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  email! : string;
  password! : string;
  doctorDetails! : DoctorDetails;
  loginFailed : boolean = false;

  constructor(private router:Router, private doctorService : DoctorDetailsService){
    this.doctorDetails = {
      id: 0,
      name: '',
      email: '',
      password: '',
      phone: '',
    };
  }

  populateLoginInfo(){
    this.email = (document.getElementById("email") as HTMLInputElement).value;
    this.password = (document.getElementById("password") as HTMLInputElement).value;
    this.doctorService.verifyLogin([this.email, this.password]).subscribe({
      next: (response) => {
        // console.log(response);
        if(response.length == 0){
          this.loginFailed = true;
        }
        else{
          this.loginFailed = false;
          this.populateDoctorDetails(response[0]);
          this.onButtonClick('doctor');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  populateDoctorDetails(user : any){
    let id : any;
    this.doctorService.getDoctorID(this.email).subscribe({
      next: (response) => {
        id = response['doctor_id'];
        this.doctorDetails = {
          id : id,
          name : user['doctor_name'],
          email : user['doctor_email'],
          password: user['doctor_password'],
          phone: user['phone'],
        }
        this.doctorService.setDoctorDetails(this.doctorDetails);
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
