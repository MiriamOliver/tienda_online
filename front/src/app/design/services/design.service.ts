import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Design, contFavorito, TipoProducto, FiltroDisenos } from '../interfaces/design.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  private baseUrl: string = environment.baseUrl;
  private nombreDesign:string = '';
  private disenos:Design[] = [];
  private favoritos:Design[] = [];
  private listaDisenos:Design[] = [];
  private disenosFiltrados:Design[] = [];

  @Output() listadoDesign: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}

  buscarDesign(data:string){
    this.nombreDesign = data;
    //return this.http.get(`${ this.baseUrl }/buscardesign/${data}`);
  }

  get listadoMostrar(){
    return this.listaDisenos;
  }

  ordenarListadoDefault(){
    this.listaDisenos = this.disenos;
  }

  ordenarListadoAfin(){
    this.listaDisenos = this.favoritos;
  }

  designDefault(){
    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    this.http.get<Design[]>(`${ this.baseUrl }/diseno/listado`)
    .subscribe(resp => {
      resp.forEach(item =>{
        item.fecha = moment(item.fecha, fechaCompleta).format('DD-MM-YYYY');
      })
      this.disenos = resp;
      this.listaDisenos = this.disenos;
    });
  }

  get listadoDefault(){
    return this.disenos.sort(function(a,b){
      return a.id - b.id;
    }).reverse();
  }

  get listadoAfin(){
    return this.favoritos;
  }

  designAfin(id:number){
    this.http.get<contFavorito[]>(`${ this.baseUrl }/diseno/listado/afin/${id}`)
    .subscribe(resp => {
      resp.forEach(element => {
        this.disenos.forEach(diseno => {
          if(element.artista == diseno.id_artista){
            this.favoritos.push(diseno);
          }
        })
      });
    });
  }

  getProductos():Observable<TipoProducto[]>{
    return this.http.get<TipoProducto[]>(`${ this.baseUrl }/diseno/filtro/productos`);
  }

  filtrarDisenos(data:FiltroDisenos){
    this.disenosFiltrados = this.listaDisenos;
    if(data.estilo != '') { this.disenosFiltrados = this.disenosFiltrados.filter(diseno => diseno.estilo == data.estilo);}
    if(data.tema != ''){ this.disenosFiltrados = this.disenosFiltrados.filter(diseno => diseno.tema == data.tema);}
    data.productos.forEach( producto =>{
      if(producto.checked == true){
        this.disenosFiltrados = this.disenosFiltrados.filter(diseno => diseno.productos.includes(producto.tipo));
      }
    });
      if(data.fecha != '' && data.fecha != 'todo'){ this.disenosFiltrados = this.conseguirFecha(data.fecha, this.disenosFiltrados)}
    this.listaDisenos = this.disenosFiltrados
  }

  conseguirFecha(fecha:string, listaFiltrados:Design[]){
    let diferencia:string;
    switch(fecha){
      case 'esta semana':
        diferencia = moment().subtract(7,'d').format('DD-MM-YYYY');
        listaFiltrados = listaFiltrados.filter(diseno => diseno.fecha >= diferencia);
      break;
      case 'este mes':
        listaFiltrados = listaFiltrados.filter(diseno => diseno.fecha.slice(3, 5) == moment().format('MM'));
      break;
      case 'este año':
        listaFiltrados = listaFiltrados.filter(diseno => diseno.fecha.slice(6, 10) == moment().format('YYYY'));
      break;
    }
    return listaFiltrados;
  }
}
