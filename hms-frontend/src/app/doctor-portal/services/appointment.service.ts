import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatientDetails } from '../interfaces/patient-details';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private patientDetailsSubject = new BehaviorSubject<PatientDetails | null>(null);
  public patientDetails = this.patientDetailsSubject.asObservable();
  constructor(private http : HttpClient) {}

  getAllAppointments(doctorId:any) : Observable<any>{
    return this.http.post('http://localhost:3000/api/get-doctor-appointments', [doctorId])
  }

  getAllMedication() : Observable<any>{
    return this.http.get('http://localhost:3000/api/get-all-medication')
  }

  getAllDiagnoses() : Observable<any>{
    // console.log(this.http.get('http://localhost:3000/api/get-all-diagnoses'));
    return this.http.get('http://localhost:3000/api/get-all-diagnoses')
  }

  setPatientDetails(patient : PatientDetails) {
    this.patientDetailsSubject.next(patient);
  }

  getPatientDetails(){
    return this.patientDetails;
  }
}
