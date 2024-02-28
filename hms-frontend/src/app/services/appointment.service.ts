import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http:HttpClient) { }

  insertAppointment(values:any[]) : Observable<any>{
    // console.log(values);
    return this.http.post("http://localhost:3000/api/insert-appointment", values);
  }

  deleteAppointment(values:any[]){
    return this.http.post("http://localhost:3000/api/delete-appointment", values);
  }

  getPatientAppointments(value : any) : Observable<any>{
    return this.http.post("http://localhost:3000/api/get-patient-appointments", [value]);
  }
}
