import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Design, InfoUsuario, crearDiseno, crearProducto, infoDesign, Productos, infoProducto } from '../interfaces/mis-disenos';
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
  private listaProductos:Productos[] = [];

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

  registrarDiseno(diseno:crearDiseno):Observable<any>{
    const formReg = new FormData();
    formReg.append('archivo', diseno.imagen);
    formReg.append('titulo', diseno.titulo);
    formReg.append('tema',  diseno.tema);
    formReg.append('estilo', diseno.estilo);
    formReg.append('descripcion', diseno.descripcion);
    formReg.append('id_artista', diseno.id_artista);

    return this.http.post<any>(`${ this.baseUrl }/diseno/misdisenos/crear`, formReg);
  }

  activarDiseno(id:number, activar:number):Observable<any>{
    let user = JSON.parse(localStorage.getItem('user')!).id;
    return this.http.put<any>(`${ this.baseUrl }/diseno/misdisenos/diseno/activar/${id}`, {id_artista:user, activado:activar});
  }

  modificarDiseno(diseno:crearDiseno, id:any):Observable<any>{
    const formReg = new FormData();
    formReg.append('archivo', diseno.imagen);
    formReg.append('titulo', diseno.titulo);
    formReg.append('tema',  diseno.tema);
    formReg.append('estilo', diseno.estilo);
    formReg.append('descripcion', diseno.descripcion);
    formReg.append('id_artista', diseno.id_artista);

    console.log(formReg);

    return this.http.put<any>(`${ this.baseUrl }/diseno/misdisenos/editar/${id}`, formReg);
  }

  getDatosDiseno(id:any):Observable<crearDiseno>{
    return this.http.get<crearDiseno>(`${ this.baseUrl }/diseno/misdisenos/diseno/info/${id}`)
  }

  addProducto(producto:crearProducto):Observable<any>{
    const formReg = new FormData();
    formReg.append('archivo', producto.imagen);
    formReg.append('titulo', producto.titulo);
    formReg.append('tipo',  producto.tipo);
    formReg.append('precio', producto.precio);
    formReg.append('descripcion', producto.descripcion);
    formReg.append('id_artista', producto.id_artista);
    formReg.append('id_diseno', producto.id_diseno);

    return this.http.post<any>(`${ this.baseUrl }/diseno/misdisenos/producto/crear`, formReg);
  }

  getTipos():Observable<string[]>{
    return this.http.get<string[]>(`${ this.baseUrl }/diseno/misdisenos/producto/tipo`);
  }

  getDisenoProductos(id:any):Observable<infoDesign>{
    let user = JSON.parse(localStorage.getItem('user')!).id;
    return this.http.get<infoDesign>(`${ this.baseUrl }/diseno/misdisenos/diseno/${id}/${user}`);
  }

  getDisenoListaProductos(id:any){
    let user = JSON.parse(localStorage.getItem('user')!).id;
    this.http.get<Productos[]>(`${ this.baseUrl }/diseno/misdisenos/listado/producto/diseno/${id}/${user}`)
    .subscribe(resp => {
      this.listaProductos = resp;
    });
  }

  get listadoProductos(){
    return this.listaProductos;
  }

  activarProducto(id:number, activar:number):Observable<any>{
    let user = JSON.parse(localStorage.getItem('user')!).id;
    return this.http.put<any>(`${ this.baseUrl }/diseno/misdisenos/producto/activar/${id}`, {id_artista:user, activado:activar});
  }

  borrarProducto(id:any):Observable<any>{
    let user = JSON.parse(localStorage.getItem('user')!).id;
    return this.http.delete<any>(`${ this.baseUrl }/diseno/misdisenos/producto/borrar/${id}/${user}`);
  }

  borrarDiseno(id:any):Observable<any>{
    let user = JSON.parse(localStorage.getItem('user')!).id;
    return this.http.delete<any>(`${ this.baseUrl }/diseno/misdisenos/diseno/borrar/${id}/${user}`);
  }

  obtenerProducto(id:any){
    let producto = this.listaProductos.filter(producto => producto.id == id);
    return producto[0];
  }

  modificarProducto(producto:infoProducto):Observable<any>{
    const formReg = new FormData();
    formReg.append('archivo', producto.imagen);
    formReg.append('titulo', producto.titulo);
    formReg.append('tipo',  producto.tipo);
    formReg.append('precio', producto.precio);
    formReg.append('descripcion', producto.descripcion);
    formReg.append('id_artista', producto.id_artista);
    formReg.append('id_diseno', producto.id_diseno);

    return this.http.post<any>(`${ this.baseUrl }/diseno/misdisenos/producto/editar/${producto.id}`, formReg);
  }
}
