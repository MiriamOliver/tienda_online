import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Design } from 'src/app/design/interfaces/design.interface';
import { environment } from 'src/environments/environment';
import { Artista } from '../interfaces/home.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}


  getUltimosDisenios():Observable<Design[]>{
    return this.http.get<Design[]>(`${ this.baseUrl }/diseno/listado`);
  }

  getDisenosRecomendados(id:number):Observable<Design[]>{
    return  this.http.get<Design[]>(`${ this.baseUrl }/diseno/recomendar/productos/${id}`);
  }

  getArtistasRecomendados(id:number):Observable<Artista[]>{
    return  this.http.get<Artista[]>(`${ this.baseUrl }/diseno/artistas/afines/${id}`);
  }

  getArtistaDestacado():Observable<Artista>{
    return this.http.get<Artista>(`${ this.baseUrl }/diseno/artista/destacado`);
  }

  getDisenosDestacado():Observable<Design[]>{
    return this.http.get<Design[]>(`${ this.baseUrl }/diseno/disenos/destacado`);
  }
}
