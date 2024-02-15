import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hms-frontend';
  loggedIn : boolean = false;
  username! : string;

  constructor(private router: Router){}

  onButtonClick(path : string){
    this.router.navigateByUrl(path);
  }
}
