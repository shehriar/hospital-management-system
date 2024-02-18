import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientDetails } from '../interfaces/patient-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {

  constructor(private http : HttpClient) {}

  submitPatientDetails(patientDetails : PatientDetails){
    return this.http.post('http://localhost:3000/api/patients', patientDetails);
  }
}
