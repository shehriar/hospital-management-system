import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientDetails } from '../interfaces/patient-details';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {
  private patientDetailsSubject = new BehaviorSubject<PatientDetails | null>(null);
  public patientDetails = this.patientDetailsSubject.asObservable();
  constructor(private http : HttpClient) {}

  submitPatientDetails(patientDetails : PatientDetails){
    return this.http.post('http://localhost:3000/api/patients', patientDetails);
  }

  submitLoginDetails(loginDetails : any): Observable<any>{
    console.log(loginDetails)
    return this.http.post('http://localhost:3000/api/login', loginDetails);
  }

  setPatientDetails(patient : PatientDetails) {
    console.log(patient);
    this.patientDetailsSubject.next(patient);
  }

  getPatientDetails(){
    return this.patientDetails;
  }
}
