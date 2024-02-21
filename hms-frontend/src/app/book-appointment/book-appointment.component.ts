import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DoctorDetailsService } from '../services/doctor-details.service';
import { DoctorDetails } from '../interfaces/doctor-details';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  allDoctors : DoctorDetails[] = [];
  @ViewChild('slideRight') buttonRight!: ElementRef;
  @ViewChild('slideLeft') buttonLeft!: ElementRef;
  @ViewChild('scrollRow') scrollableContainer!: ElementRef;
  constructor(private doctorService : DoctorDetailsService){}

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
      console.log(this.allDoctors);
    });
  }
}
