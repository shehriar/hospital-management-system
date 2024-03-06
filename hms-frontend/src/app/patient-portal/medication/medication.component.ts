import { Component } from '@angular/core';
import { Medication } from '../interfaces/medication';
import { MedicationService } from '../services/medication.service';
import { PatientDetailsService } from '../services/patient-details.service';
import { PatientDetails } from '../interfaces/patient-details';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent {
  patientMedication : Medication[] = [];
  patientDetails! : PatientDetails;
  isLoggedIn : boolean = false;
  tableHeaders = ["Medication", "Dosage", "Date Range"];
  constructor(private medicationService : MedicationService, private patientService : PatientDetailsService){}

  ngOnInit(){
    this.patientService.patientDetails.subscribe(patient => {
      if(patient){
        this.patientDetails = patient;
        this.isLoggedIn = true;
      }
    })
    this.populatePatientMedication();
  }

  populatePatientMedication(){
    this.medicationService.getPatientMedication(this.patientDetails.id).subscribe(data=>{
      this.patientMedication = data.map((item:any) => {
        return{
          ...item,
          name: item.medication_name,
          dosage: item.dosage,
          dateRange: item.dateRange
        };
      })
    })
  }
}
