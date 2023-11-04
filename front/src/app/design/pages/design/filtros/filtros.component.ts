import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltroDisenos, TipoProducto } from 'src/app/design/interfaces/design.interface';
import { DesignService } from 'src/app/design/services/design.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit{

  fecha:string = "";
  estilo:string = "";
  tema:string = "";
  productos:TipoProducto[] = [];
  data!:FiltroDisenos;

  constructor(
    private router: Router,
    private designService: DesignService,
  ) {

  }

  ngOnInit(): void {
    this.designService.getProductos().subscribe(resp => {
      console.log(resp);
      this.productos = resp;
    });
  }

  filtrarCampos(){
    this.data  = {
      fecha: this.fecha,
      estilo:this.estilo,
      tema:this.tema,
      productos:this.productos
    }
    console.log(this.data);
    this.designService.filtrarDisenos(this.data);

  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }



}
