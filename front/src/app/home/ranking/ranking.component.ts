import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { ArtistaDestacado, Diseno } from '../interfaces/home.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit{

  artista!:ArtistaDestacado;
  disenos:Diseno[] = [];

  constructor(
    private router: Router,
    private homeService: HomeService,
  ) {
    this.artista = {
      id:0,
      nombre:'',
      avatar:'',
      disenos:0,
    }
  }

  ngOnInit(): void {
    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";

    this.homeService.getArtistaDestacado()
    .subscribe(resp =>{
      this.artista = resp;
    });

    this.homeService.getDisenosDestacados()
    .subscribe(resp =>{
      resp.forEach(item =>{
        item.fecha = moment(item.fecha, fechaCompleta).format('DD-MM-YYYY');
      })
      this.disenos = resp;
    });
  }

  verDiseno(id:any){
    this.router.navigate(['infodiseno/' + id]);
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }
}
