import { Injectable } from '@angular/core';
import { DoctorDetails } from '../interfaces/doctor-details';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorDetailsService {
  private doctorDetailsSubject = new BehaviorSubject<DoctorDetails | null>(null);
  public doctorDetails = this.doctorDetailsSubject.asObservable();
  constructor(private http : HttpClient) { }

  getAllDoctors() : Observable<any>{
    return this.http.get("http://localhost:3000/api/all-doctors");
  }

  getAppointmentDateTimeFromDoctor(doctorID : any) : Observable<any>{
    console.log("reached service");
    return this.http.post("http://localhost:3000/api/appointment-date-time-from-doctor", [doctorID]);
  }

  setDoctorDetails(doctor : DoctorDetails) {
    this.doctorDetailsSubject.next(doctor);
  }

  getDoctorDetails(){
    return this.doctorDetails;
  }
}
