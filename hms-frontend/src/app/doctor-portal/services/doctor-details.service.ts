import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorDetails } from '../interfaces/doctor-details';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DoctorDetailsService {
  private doctorDetailsSubject = new BehaviorSubject<DoctorDetails | null>(null);
  public doctorDetails = this.doctorDetailsSubject.asObservable();
  constructor(private http : HttpClient) { }

  submitDoctorDetails(doctor : DoctorDetails) : Observable<any>{
    return this.http.post('http://localhost:3000/api/doctor-signup', doctor)
  }

  getDoctorID(email : any) : Observable<any>{
    return this.http.post('http://localhost:3000/api/get-doctor-id', [email])
  }

  verifyLogin(loginDetails: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/verify-doctor-login', loginDetails);
  }

  setDoctorDetails(doctor : DoctorDetails) {
    this.doctorDetailsSubject.next(doctor);
  }

  getDoctorDetails(){
    return this.doctorDetails;
  }
}
