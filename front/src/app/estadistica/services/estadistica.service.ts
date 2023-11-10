import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EstadisticaAnio, EstadisticaMes } from '../interfaces/estadistica';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}

  getGraficoMeses(id:number):Observable<EstadisticaMes[]>{
    return this.http.get<EstadisticaMes[]>(`${ this.baseUrl }/pedido/beneficios/mes/${id}`)
  }

  getGraficoAnios(id:number):Observable<EstadisticaAnio[]>{
    return this.http.get<EstadisticaAnio[]>(`${ this.baseUrl }/pedido/beneficios/anio/${id}`)
  }
}
