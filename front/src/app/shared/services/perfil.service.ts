import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Perfil, Resultado } from '../interfaces/perfil.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  cerrarSesion(id:number):Observable<Resultado> {
    return this.http.put<Resultado>(`${this.baseUrl}/logout`,{id:id});
  }
}
