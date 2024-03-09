import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosesService {
  constructor(private http:HttpClient) { }
  
  getPatientDiagnoses(patientId : any) : Observable<any>{
    return this.http.post("http://localhost:3000/api/get-patient-diagnoses", [patientId])
  }
}
