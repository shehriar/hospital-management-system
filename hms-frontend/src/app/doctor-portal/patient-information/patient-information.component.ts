import { Component } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { PatientDetails } from '../interfaces/patient-details';

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.css']
})
export class PatientInformationComponent {
  patientDetails! : PatientDetails;
  allMedication : String[] = [];
  allDiagnoses : String[] = [];
  selectedDiagnosis: String = '';
  selectedMedications: String[] = [];
  constructor(private appointmentService : AppointmentService, private router : Router){}

  ngOnInit(){
    this.appointmentService.patientDetails.subscribe(data => {
      this.patientDetails = {
        id : data?.id,
        name : data?.name,
        email : data?.email,
        phone : data?.phone,
        dob : data?.dob,
      }
      this.appointmentService.getAllDiagnoses().subscribe(data => {
        for(let i = 0; i<data.length; i++){
          this.allDiagnoses.push(data[i].diagnosis_name);
        }
      })
      this.appointmentService.getAllMedication().subscribe(data => {
        for(let i = 0; i<data.length; i++){
          this.allMedication.push(data[i].medication_name);
        }
      })
      console.log(this.allMedication)
    })
  }

  onMedicationChange(event: any, medication: String) {
    if (event.target.checked) {
        this.selectedMedications.push(medication);
    } else {
        this.selectedMedications = this.selectedMedications.filter(m => m !== medication);
    }
  }

  onClick(path : string){
    this.router.navigateByUrl(path);
  }

  onSubmit(){
    console.log(this.selectedDiagnosis);
    console.log(this.selectedMedications);
  }
}
