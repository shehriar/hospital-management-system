import { Component } from '@angular/core';
import { DiagnosesService } from '../services/diagnoses.service';
import { Diagnosis } from '../interfaces/diagnosis';
import { PatientDetails } from '../interfaces/patient-details';
import { PatientDetailsService } from '../services/patient-details.service';

@Component({
  selector: 'app-diagnoses',
  templateUrl: './diagnoses.component.html',
  styleUrls: ['./diagnoses.component.css']
})
export class DiagnosesComponent {
  patientDiagnoses : Diagnosis[] = [];
  patientDetails! : PatientDetails;
  tableHeaders = ["Diagnosis", "Date Diagnosed"];
  isLoggedIn : boolean = false;
  constructor(private diagnosesService : DiagnosesService, private patientService : PatientDetailsService){}

  ngOnInit(){
    this.patientService.patientDetails.subscribe(patient => {
      if(patient){
        this.patientDetails = patient;
        this.isLoggedIn = true;
      }
    })
    this.populatePatientDiagnoses();
  }

  populatePatientDiagnoses(){
    this.diagnosesService.getPatientDiagnoses(this.patientDetails.id).subscribe(data=>{
      this.patientDiagnoses = data.map((item:any) => {
        return{
          ...item,
          name: item.diagnosis_name,
          date: item.date
        };
      })
    })
  }
}
