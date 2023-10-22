import { Injectable } from '@angular/core';
import { Registro, Resultado, Auth } from '../interfaces/auth.interface';
import { environment } from './../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private usuario: Registro[];
  private auth: Auth | undefined;

  constructor(
    private http: HttpClient
  ) {
    this.usuario = [];
  }

  registro(usuario: Registro): Observable<Resultado> {
    const formReg = new FormData();
    formReg.append('archivo', usuario.avatar);
    formReg.append('nombre', usuario.nombre);
    formReg.append('email',  usuario.email);
    formReg.append('password', usuario.password);

    return this.http.post<Resultado>(`${ this.baseUrl }/registro`, formReg);
  }
}
