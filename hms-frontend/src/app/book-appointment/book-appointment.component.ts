import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DoctorDetailsService } from '../services/doctor-details.service';
import { DoctorDetails } from '../interfaces/doctor-details';
import { PatientDetails } from '../interfaces/patient-details';
import { PatientDetailsService } from '../services/patient-details.service';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  allDoctors : DoctorDetails[] = [];
  userDetails! : PatientDetails;
  loggedIn : boolean = false;
  doctorSelected : boolean = false;
  selectedDoctorID : any;
  availability! : Array<{date: string, dayOfWeek: string, time : string[]}>;
  availableTimes! : any[];

  dateSelected : any;
  timeSelected : any;
  dayOfWeekSelected : any;

  isPopupVisible : boolean = false;
  confirmPopupVisible : boolean = false;

  @ViewChild('slideRight') buttonRight!: ElementRef;
  @ViewChild('slideLeft') buttonLeft!: ElementRef;
  @ViewChild('scrollRow') scrollableContainer!: ElementRef;
  constructor(private doctorService : DoctorDetailsService, private patientService : PatientDetailsService, private appointmentService : AppointmentService){
    this.patientService.patientDetails.subscribe(patient => {
      if(patient){
        this.userDetails = patient;
        this.loggedIn = true;
      }
    })
  }

  ngAfterViewInit() {
    this.buttonRight.nativeElement.addEventListener('click', () => {
      this.scrollableContainer.nativeElement.scrollTo({
        left: this.scrollableContainer.nativeElement.scrollLeft + 755,
        behavior: 'smooth'
      });
    });
  
    this.buttonLeft.nativeElement.addEventListener('click', () => {
      this.scrollableContainer.nativeElement.scrollTo({
        left: this.scrollableContainer.nativeElement.scrollLeft - 755,
        behavior: 'smooth'
      });
    });
  }

  ngOnInit(){
    this.doctorService.getAllDoctors().subscribe(data =>{
      this.allDoctors = data.map((item:any) => {
        return{
          ...item,
          id: item.doctor_id,
          name: item.doctor_name,
          email: item.doctor_email,
        };
      })
    });
  }

  clickDoctor(doctorID : any){
    this.selectedDoctorID = doctorID;
    this.doctorSelected = true;
    this.availableTimes = [];
    this.fillAvailability();
    this.doctorService.getAppointmentDateTimeFromDoctor(this.selectedDoctorID).subscribe(data => {
      data.forEach( (appointment:any) => {
        const {appointment_date, appointment_time} = appointment;
      
        const dateIndex = this.availability.findIndex(avail => avail.date === appointment_date);
        
        if (dateIndex !== -1) {
          this.availability[dateIndex].time = this.availability[dateIndex].time.filter(time => time !== appointment.appointment_time);
        }
      });
    });
    console.log(this.availability);
  }

  fillAvailability(){
    let appointmentDates = this.getDates();
    let appointmentTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

    this.availability = [];
    for(let i = 0; i<appointmentDates.length; i++){
      this.availability.push({
        date : appointmentDates[i].date,
        dayOfWeek : appointmentDates[i].dayOfWeek,
        time : appointmentTimes
      })
    }
  }

  updateTimes(e : any){
    if(e.target.value != ""){
      const index = Number(e.target.value);
      this.dateSelected = this.availability[index].date;
      this.dayOfWeekSelected = this.availability[index].dayOfWeek;
      this.availableTimes = this.availability[index].time;
    }
    else{
      this.availableTimes = []
    }
  }

  timeButtonClicked(time : any){
    this.timeSelected = time;
    this.isPopupVisible = true;
  }

  closePopup(){
    this.isPopupVisible = false;
    this.confirmPopupVisible = false;
    // console.log(this.availability);
    this.clickDoctor(this.selectedDoctorID);
  }

  continueButtonClicked(){
    this.confirmPopupVisible = true;
    this.appointmentService.insertAppointment([this.dateSelected, this.selectedDoctorID, this.userDetails.id, 200, this.timeSelected]).subscribe(data => {
      console.log(data);
    })
  }

  // Function will get dates of the next week excluding weekends.
  getDates(): Array<{date: string, dayOfWeek: string}> {
    const result: Array<{date: string, dayOfWeek: string}> = [];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let currentDate = new Date();
  
    while (result.length < 7) {
      const dayOfWeek = currentDate.getDay();
  
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 is Sunday, 6 is Saturday
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        result.push({
          date: formattedDate,
          dayOfWeek: daysOfWeek[dayOfWeek]
        });
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return result;
  }
}
