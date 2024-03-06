import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorDetailsService } from '../services/doctor-details.service';
import { DoctorDetails } from '../interfaces/doctor-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class DoctorHomeComponent {
  doctorDetails! : DoctorDetails;
  isLoggedIn : boolean = false;
  constructor(private router : Router, private doctorService : DoctorDetailsService){
    this.doctorDetails = {
      id : 0,
      name : "",
      email : "",
      phone : "",
      password : ""
    };
  }

  ngOnInit(){
    this.doctorService.doctorDetails.subscribe(doctor => {
      if(doctor){
        this.doctorDetails = doctor;
        this.isLoggedIn = true;
      }
    })
  }

  onButtonClick(path : string){
    this.router.navigateByUrl(path);
  }
}
