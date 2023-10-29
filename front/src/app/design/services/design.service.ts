import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  private baseUrl: string = environment.baseUrl;
  private nombre_design:string = '';

  @Output() listadoDesign: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}

  buscarDesign(data:string){
    this.nombre_design = data;
    //return this.http.get(`${ this.baseUrl }/buscardesign/${data}`);
  }
}
