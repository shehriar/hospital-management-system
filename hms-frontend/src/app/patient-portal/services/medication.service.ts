import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(private http:HttpClient) { }
  
  getPatientMedication(patientId : any) : Observable<any>{
    return this.http.post("http://localhost:3000/api/get-patient-medication", [patientId])
  }
}
