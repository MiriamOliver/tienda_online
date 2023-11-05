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

  constructor(
    private router: Router,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {

    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    this.homeService.getUltimosDisenios().subscribe(resp => {
      resp.forEach(item =>{
        item.fecha = moment(item.fecha, fechaCompleta).format('DD-MM-YYYY');
      })
      this.ultimosDisenos = resp;
    });
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }

}
