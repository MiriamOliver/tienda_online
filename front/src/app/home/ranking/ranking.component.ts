import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { ArtistaDestacado, Diseno } from '../interfaces/home.interface';

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
  ) {}

  ngOnInit(): void {

    this.homeService.getArtistaDestacado()
    .subscribe(resp =>{
      this.artista = resp;
      console.log(this.artista);
    });

    this.homeService.getDisenosDestacados()
    .subscribe(resp =>{
      this.disenos = resp;
      console.log(this.disenos);
    });

  }
}
