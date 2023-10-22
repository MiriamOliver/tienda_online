import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-auth',
  templateUrl: './main-auth.component.html',
  styleUrls: ['./main-auth.component.scss']
})
export class MainAuthComponent {
  inicio: string = 'login';

constructor(private router: Router) {}

ngOnInit(): void {

  if (this.router.url.includes('login')) {
    this.inicio = 'login';
  }
  else if (this.router.url.includes('registro')) {
    this.inicio = 'registro';
  }
  else if (this.router.url.includes('recpasswd')) {
    this.inicio = 'recpasswd';
  }
  else if (this.router.url.includes('genpasswd')) {
    this.inicio = 'genpasswd';
  }
}

}
