import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { Artista } from '../interfaces/home.interface';

@Component({
  selector: 'app-artistas-afines',
  templateUrl: './artistas-afines.component.html',
  styleUrls: ['./artistas-afines.component.scss']
})
export class ArtistasAfinesComponent implements OnInit{

  artistas:Artista[] = [];
  mensaje:number = -1;

  constructor(
    private router: Router,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {

    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    this.homeService.getArtistasRecomendados(JSON.parse(localStorage.getItem('user')!).id).subscribe(resp => {
      this.artistas = resp;
      if(this.artistas.length == 0){
        this.mensaje = 1;
      }
    });
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }

}
