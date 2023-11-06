import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Design } from 'src/app/design/interfaces/design.interface';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-disenos-recomendados',
  templateUrl: './disenos-recomendados.component.html',
  styleUrls: ['./disenos-recomendados.component.scss']
})
export class DisenosRecomendadosComponent implements OnInit{

  disenosRecomendados:Design[] = [];

  constructor(
    private router: Router,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {

    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    this.homeService.getDisenosRecomendados(JSON.parse(localStorage.getItem('user')!).id).subscribe(resp => {
      resp.forEach(item =>{
        item.fecha = moment(item.fecha, fechaCompleta).format('DD-MM-YYYY');
      })
      this.disenosRecomendados = resp;
    });
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }

}
