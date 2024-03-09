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
  dateRange! : String;
  selectedMedications: { name: String; dosage?: number; startDate?: String; endDate?: String }[] = [];
  currDate!: String;
  errorMessage : boolean = false;
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
      this.currDate = new Date().toISOString().split('T')[0];
      
    })
  }

  onMedicationChange(event: any, medicationName: String) {
    if (event.target.checked) {
      this.selectedMedications.push({ name: medicationName });
    } else {
      this.selectedMedications = this.selectedMedications.filter(m => m.name !== medicationName);
    }
  }

  onClick(path : string){
    this.router.navigateByUrl(path);
  }

  onSubmit(){
    // console.log(this.selectedDiagnosis);
    // console.log(this.selectedMedications);
    if(this.selectedDiagnosis){
      this.appointmentService.insertToDiagnoses(this.patientDetails.id, this.selectedDiagnosis, this.currDate).subscribe();
    }

    if(this.selectedMedications){
      for(let i = 0; i < this.selectedMedications.length; i++) {
        const medication = this.selectedMedications[i];
        if (medication.startDate && medication.endDate && medication.dosage) {
          const dateRange = `${medication.startDate} - ${medication.endDate}`;
          this.appointmentService.insertToMedication(this.patientDetails.id, medication.name, medication.dosage, dateRange).subscribe();
        }
      }
    }
    this.onClick('doctor/appointments')
  }
}
