import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  //rol:string = JSON.parse(localStorage.getItem('user')!).rol;
  rol:string = 'cliente';

  constructor(
    private router: Router) { }

}
