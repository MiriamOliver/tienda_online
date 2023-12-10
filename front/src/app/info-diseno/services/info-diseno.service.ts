import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosDiseno } from '../interfaces/info-diseno';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoDisenoService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getDatosDiseno(id:any):Observable<DatosDiseno>{
    return this.http.get<DatosDiseno>(`${ this.baseUrl }/diseno/infodiseno/diseno/${id}`);
  }
}
