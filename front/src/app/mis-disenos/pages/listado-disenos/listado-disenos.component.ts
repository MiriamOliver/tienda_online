import { Component, OnInit } from '@angular/core';
import { MisDisenosService } from '../../services/mis-disenos.service';
import { Router } from '@angular/router';
import { Design, InfoUsuario } from '../../interfaces/mis-disenos';
import * as moment from 'moment';

@Component({
  selector: 'app-listado-disenos',
  templateUrl: './listado-disenos.component.html',
  styleUrls: ['./listado-disenos.component.scss']
})
export class ListadoDisenosComponent implements OnInit{

  input_search:string = "";
  public design!:Design;
  infoDiseno:number = 0;
  public usuario!:InfoUsuario;
  confirmarBorrarDiseno = -1;
  id_diseno = 0;
  contenedor:any = null;
  pag:number;


  constructor(
    private misDesignService: MisDisenosService,
    private router:Router
  ) {
    this.design = {
      id:0,
      titulo:'',
      imagen:'',
      id_artista:0,
      nombre:'',
      fecha:'',
      tema:'',
      estilo:'',
      favoritos:0,
      activado:1,
      productos:[]
    }
    this.usuario = {
      id:0,
      nombre:'',
      avatar:'',
      fecha:'',
      favoritos:0,
      disenos:0
    }
    this.pag = 1;
  }

  ngOnInit(): void {
    this.misDesignService.designDefault(JSON.parse(localStorage.getItem('user')!).id);
    this.getInfoUsuario(JSON.parse(localStorage.getItem('user')!).id);
    if(localStorage.getItem('diseno')){
      localStorage.removeItem('diseno');
    }
  }

  get listadoMostrar(){
    return this.misDesignService.listadoMostrar;
  }

  sendData(){
    this.misDesignService.buscarDesign(this.input_search);
    this.pag = 1;
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }

  verDiseno(id:any){
    this.router.navigate(['infodiseno/' + id]);
  }

  mostrarDiseno(id:number){
    this.design = this.misDesignService.getDiseno(id);
    this.infoDiseno = 1;
  }

  getInfoUsuario(id:number){
    this.misDesignService.getInfoUsuario(id)
    .subscribe(resp => {
      this.usuario = resp;

    });
  }

  modificarDiseno(id:number){
    this.router.navigate(['misdisenos/editar/' + id]);
  }

  crearDiseno(){
    this.router.navigate(['misdisenos/crear']);
  }

  abrirBorrarDiseno(id:any){
    this.confirmarBorrarDiseno = 1;
    this.id_diseno = id;
    this.contenedor = document.getElementById('info'+this.id_diseno);
    this.contenedor.style.position = 'relative';
  }

  cerrarBorrarDiseno(){
    this.confirmarBorrarDiseno = -1;
    this.id_diseno = 0;
    this.contenedor.style.removeProperty("position")
    this.contenedor = null;
  }

  borrarDiseno(){
    this.misDesignService.borrarDiseno(this.id_diseno)
    .subscribe(resp => {
      if(resp.success){
        this.id_diseno = 0;
        this.contenedor.style.removeProperty("position")
        this.contenedor = null;
        window.location.reload();
      }
    });
  }

  activarDiseno(id:number, activar:number){
    this.misDesignService.activarDiseno(id, activar)
      .subscribe(resp => {
        if(resp.success){
          window.location.reload();
        }
      });
  }

}
