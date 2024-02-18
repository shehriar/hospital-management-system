import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showColumns = !(event.url === '/login' || event.url === '/signup');
      }
    });
  }

  onButtonClick(path : string){
    this.router.navigateByUrl(path);
  }
}
