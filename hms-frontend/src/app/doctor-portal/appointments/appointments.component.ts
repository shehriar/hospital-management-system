import { Component } from '@angular/core';
import { DoctorDetails } from '../interfaces/doctor-details';
import { DoctorDetailsService } from '../services/doctor-details.service';
import { AppointmentDetails } from '../interfaces/appointment';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { PatientDetails } from '../interfaces/patient-details';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  doctorDetails! : DoctorDetails;
  isLoggedIn : boolean = false;
  appointments : AppointmentDetails[] = [];
  currDate! : string;
  currPatient! : PatientDetails;
  appointmentTableHeaders = ['Date', 'Time', 'Patient', ''];
  constructor(private doctorService : DoctorDetailsService, private appointmentService : AppointmentService, private router : Router){}

  ngOnInit(){
    this.doctorService.getDoctorDetails().subscribe(doctor => {
      if(doctor){
        this.doctorDetails = doctor;
        this.isLoggedIn = true;
      }
    })
    console.log(this.doctorDetails);
    this.populateAppointments();
  }

  populateAppointments(){
    this.currDate = (new Date()).toISOString().split('T')[0]
    this.appointmentService.getAllAppointments(this.doctorDetails.id).subscribe(data => {
      const filteredAppointments = data.filter((item: any) => {
        if(item.appointment_date > this.currDate){
          return item;
        }
      });
      
      this.appointments = filteredAppointments.map((item:any) => {
        return{
          ...item,
          id: item.appointment_id,
          patient_id : item.patient_id,
          patient_name : item.patient_name,
          patient_email : item.patient_email,
          patient_phone : item.phone,
          patient_dob : item.dob,
          date: item.appointment_date,
          time: item.appointment_time,
        };
      })
    })
  }

  clickOnPatient(path : string, patient : any){
    this.currPatient = {
      id: patient[0].id,
      name: patient[0].name,
      email: patient[0].email,
      phone: patient[0].phone,
      dob: patient[0].dob
    };
    this.appointmentService.setPatientDetails(this.currPatient);
    this.router.navigateByUrl(path);
  }

  navigatePage(path : string){
    this.router.navigateByUrl(path);
  }
}
