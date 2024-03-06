import { Component } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { PatientDetails } from '../interfaces/patient-details';

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.css']
})
export class PatientInformationComponent {
  patientDetails! : PatientDetails;
  constructor(private appointmentService : AppointmentService, private router : Router){}

  ngOnInit(){
    this.appointmentService.patientDetails.subscribe(data => {
      this.patientDetails = {
        id : data?.id,
        name : data?.name,
        email : data?.email,
        phone : data?.phone,
        dob : data?.dob,
      }
    })
  }
}
