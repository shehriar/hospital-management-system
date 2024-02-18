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

  setSelectedVehicle(patient : PatientDetails) {
    this.patientDetailsSubject.next(patient);
  }

  getSelectedVehicle(){
    return this.patientDetails;
  }
}
