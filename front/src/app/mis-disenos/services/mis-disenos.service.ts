import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Design, InfoUsuario } from '../interfaces/mis-disenos';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MisDisenosService {

  private baseUrl: string = environment.baseUrl;
  private nombreDesign:string = '';
  private listaDisenos:Design[] = [];
  private auxListaDisenos:Design[] = [];

  constructor(
    private http: HttpClient
  ) {}

  buscarDesign(data:string){
    this.nombreDesign = data;
    if(this.nombreDesign != ''){
      this.listaDisenos = this.auxListaDisenos;
      this.listaDisenos = this.listaDisenos.filter(diseno => diseno.titulo.toLowerCase().includes(this.nombreDesign.toLowerCase()));
    }else{
      this.listaDisenos = this.auxListaDisenos;
    }
  }

  designDefault(id:number){
    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    this.http.get<Design[]>(`${ this.baseUrl }/diseno/listado/misdisenos/${id}`)
    .subscribe(resp => {
      resp.forEach(item =>{
        item.fecha = moment(item.fecha, fechaCompleta).format('DD-MM-YYYY');
      })
      this.listaDisenos = resp;
      this.auxListaDisenos = this.listaDisenos;
    });
  }

  get listadoMostrar(){
    return this.listaDisenos;
  }

  getDiseno(id:number){
    let diseno = this.listaDisenos.filter(diseno => diseno.id == id);
    return diseno[0];
  }

  getInfoUsuario(id:number):Observable<InfoUsuario>{
    return this.http.get<InfoUsuario>(`${ this.baseUrl }/diseno/misdisenos/usuario/${id}`)
  }
}
