import { Component, OnInit } from '@angular/core';
import { ListaProductos } from '../../interfaces/info-diseno';
import { InfoDisenoService } from '../../services/info-diseno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit{

  productos:ListaProductos[] = [];
  producto:ListaProductos;
  contenedorProducto:number = 0;
  pag:number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private infoDisenoService:InfoDisenoService
  ) {
    this.pag = 1;
    this.producto = {
      id:0,
      titulo:'',
      imagen:'',
      tipo:'',
      precio:0,
      estado:'',
      descripcion:'',
      fecha:'',
      activado:0,
    }
  }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.infoDisenoService.getDatosProductos(id))
      )
      .subscribe(( resp) => {
        this.productos = resp;
      })
  }

  mostrarProducto(id:any){
    let infoProducto = this.productos.filter(producto => producto.id == id)
    this.producto = infoProducto[0];
    this.contenedorProducto = 1;
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }
}
