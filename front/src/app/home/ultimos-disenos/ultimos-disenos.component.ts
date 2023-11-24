import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Design } from 'src/app/design/interfaces/design.interface';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-ultimos-disenos',
  templateUrl: './ultimos-disenos.component.html',
  styleUrls: ['./ultimos-disenos.component.scss']
})
export class UltimosDisenosComponent implements OnInit{

  ultimosDisenos:Design[] = [];
  cont = 6;

  constructor(
    private router: Router,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {

    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    this.homeService.getUltimosDisenios().subscribe(resp => {
      console.log(resp);
      resp.forEach(item =>{
        if(this.cont > 0){
          item.fecha = moment(item.fecha, fechaCompleta).format('DD-MM-YYYY');
          this.ultimosDisenos.push(item);
          this.cont --;
        }
      })
    });
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }

}
