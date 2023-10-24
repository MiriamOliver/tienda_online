import { Injectable } from '@angular/core';
import { Registro, Resultado, Auth, Sesion } from '../interfaces/auth.interface';
import { environment } from './../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private auth: Auth | undefined;

  constructor(
    private http: HttpClient
  ) {}

  registro(usuario: Registro): Observable<Resultado> {
    const formReg = new FormData();
    formReg.append('archivo', usuario.avatar);
    formReg.append('nombre', usuario.nombre);
    formReg.append('email',  usuario.email);
    formReg.append('password', usuario.password);

    return this.http.post<Resultado>(`${ this.baseUrl }/registro`, formReg);
  }

  login(usuario:Sesion): Observable<Auth>  {
    return this.http.post<Auth>(`${ this.baseUrl }/login`, usuario)
      .pipe(tap(auths => this.auth = auths));
  }

  recPassword(email:string): Observable<Resultado>{
    return this.http.post<Resultado>(`${ this.baseUrl }/recpassword`, { email: email });
  }

  generarPassword(passwd: string, codigo:string): Observable<Resultado>{
    return this.http.post<Resultado>(`${this.baseUrl}/generarpasswd/`, {password: passwd, codigo: codigo});
  }
}
