import { Component } from '@angular/core';
import { PatientDetails } from '../interfaces/patient-details';
import { PatientDetailsService } from '../services/patient-details.service';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../interfaces/appointment';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent {
  patientDetails! : PatientDetails;
  isLoggedIn : boolean = false;
  isPopupVisible : boolean = false;
  appointmentDetails : Appointment[] = [];
  appointmentToDelete! : Appointment;
  appointmentTableHeaders = ['Date', 'Time', 'Doctor', ''];
  currDate! : string;
  constructor(private patientService : PatientDetailsService, private appointmentService : AppointmentService){}
  ngOnInit(){
    this.patientService.patientDetails.subscribe(patient => {
      if(patient){
        this.patientDetails = patient;
        this.isLoggedIn = true;
      }
    })
    this.populateAppointmentDetails();
  }

  populateAppointmentDetails(){
    if(this.isLoggedIn){
      this.currDate = (new Date()).toISOString().split('T')[0]
      this.appointmentService.getPatientAppointments(this.patientDetails.id).subscribe(data => {
        const filteredAppointments = data.filter((item: any) => {
          if(item.appointment_date > this.currDate){
            return item;
          }
        });
        this.appointmentDetails = filteredAppointments.map((item:any) => {
          return{
            ...item,
            date: item.appointment_date,
            time: item.appointment_time,
            doctorName: item.doctor_name
          };
        })
      })
    }
  }

  clickDelete(appointment : Appointment){
    this.appointmentToDelete = appointment;
    this.isPopupVisible = true;
  }

  closePopup(){
    this.isPopupVisible = false;
  }

  deleteAppointment(){
    let aptArray = [this.appointmentToDelete.date, this.appointmentToDelete.time, this.appointmentToDelete.doctorName];
    this.appointmentService.deleteAppointment(aptArray).subscribe(data => {
      this.appointmentDetails = [];
      this.populateAppointmentDetails();
    });
    this.closePopup();
  }
}
