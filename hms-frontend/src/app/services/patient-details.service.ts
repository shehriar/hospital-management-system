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

  submitPatientDetails(patientDetails : PatientDetails) : Observable<any>{
    return this.http.post('http://localhost:3000/api/patients', patientDetails);
  }

  submitLoginDetails(loginDetails : any): Observable<any>{
    return this.http.post('http://localhost:3000/api/login', loginDetails);
  }

  getPatientID(email : any) : Observable<any>{
    return this.http.post('http://localhost:3000/api/patient_id', [email])
  }

  setPatientDetails(patient : PatientDetails) {
    console.log(patient);
    this.patientDetailsSubject.next(patient);
  }

  getPatientDetails(){
    return this.patientDetails;
  }
}
