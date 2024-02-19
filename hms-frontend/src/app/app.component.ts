import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PatientDetails } from './interfaces/patient-details';
import { PatientDetailsService } from './services/patient-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hms-frontend';
  loggedIn : boolean = false;
  username! : string;
  showColumns: boolean = true;
  patientDetails! : PatientDetails;

  constructor(private router: Router, private patientService : PatientDetailsService){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showColumns = !(event.url === '/login' || event.url === '/signup');
      }
    });
    this.ngOnInit();
  }

  ngOnInit(){
    this.patientService.patientDetails.subscribe(patient => {
      if(patient){
        this.patientDetails = patient;
        console.log(patient);
        this.loggedIn = true;
        this.username = this.patientDetails.name.split(" ")[0];
      }
    })
  }

  onButtonClick(path : string){
    this.router.navigateByUrl(path);
  }
}
