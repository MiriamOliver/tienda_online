import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Design, listaDisenos, TipoProducto, FiltroDisenos } from '../interfaces/design.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  private baseUrl: string = environment.baseUrl;
  private nombreDesign:string = '';
  private tipoBusqueda:string = 'todo';
  private disenos:Design[] = [];
  private favoritos:Design[] = [];
  private listaDisenos:Design[] = [];
  private disenosFiltrados:Design[] = [];
  private auxListaDisenos:Design[] = [];
  private listaDisenosAnterior:Design[] = [];


  @Output() listadoDesign: EventEmitter<any> = new EventEmitter();

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
    this.listaDisenosAnterior = [];
  }

  get listadoMostrar(){
    return this.listaDisenos;
  }

  ordenarListadoDefault(busqueda:string){
    this.listaDisenos = this.disenos;
    this.tipoBusqueda = busqueda;
    this.auxListaDisenos = this.disenos;
    this.listaDisenosAnterior = [];
  }

  ordenarListadoAfin(busqueda:string){
    this.listaDisenos = this.favoritos;
    this.tipoBusqueda = busqueda;
    this.auxListaDisenos = this.favoritos;
    this.listaDisenosAnterior = [];
  }

  designDefault(id:number){
    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    this.http.get<listaDisenos>(`${ this.baseUrl }/diseno/listado/${id}`)
    .subscribe(resp => {
      this.disenos = resp.todos;
      this.favoritos = resp.afines;
      this.disenos.forEach(item =>{
        item.fecha = moment(item.fecha, fechaCompleta).format('DD-MM-YYYY');
      })
      this.favoritos.forEach(item =>{
        item.fecha = moment(item.fecha, fechaCompleta).format('DD-MM-YYYY');
      })
      this.listaDisenos = this.disenos;
      this.auxListaDisenos = this.disenos;
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

  getProductos():Observable<TipoProducto[]>{
    return this.http.get<TipoProducto[]>(`${ this.baseUrl }/diseno/filtro/productos`);
  }

  filtrarDisenos(data:FiltroDisenos){
    if(this.listaDisenosAnterior.length > 0 ){
      this.listaDisenos = this.listaDisenosAnterior;
    }
    this.disenosFiltrados = this.listaDisenos;
    if(data.estilo != '') { this.disenosFiltrados = this.disenosFiltrados.filter(diseno => diseno.estilo == data.estilo);}
    if(data.tema != ''){ this.disenosFiltrados = this.disenosFiltrados.filter(diseno => diseno.tema == data.tema);}
    data.productos.forEach( producto =>{
      if(producto.checked == true){
        this.disenosFiltrados = this.disenosFiltrados.filter(diseno => diseno.productos.includes(producto.tipo));
      }
    });
      if(data.fecha != '' && data.fecha != 'todo'){
        this.disenosFiltrados = this.conseguirFecha(data.fecha, this.disenosFiltrados)
      }
      this.listaDisenosAnterior = this.listaDisenos;
      this.listaDisenos = this.disenosFiltrados;
  }

  conseguirFecha(fecha:string, listaFiltrados:Design[]){
    switch(fecha){
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
