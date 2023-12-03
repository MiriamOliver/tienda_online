import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MisDisenosService } from '../../services/mis-disenos.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent implements OnInit{

  productos:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private misDesignService:MisDisenosService) { }


    ngOnInit(): void {
      this.misDesignService.getDisenoListaProductos(JSON.parse(localStorage.getItem('diseno')!).id);
    }

    get listadoProductos(){
      return this.misDesignService.listadoProductos;
    }

    letraMayuscula(nombre:string){
      let firstLetra = nombre.charAt(0);
      let palabra = nombre.slice(1);
      return firstLetra.toUpperCase() + palabra;
    }

    modificarProducto(id:any){

    }

    borrarProducto(id:any){

    }

    activarProducto(id:number, activar:number){
      this.misDesignService.activarProducto(id, activar)
      .subscribe(resp => {
        if(resp.success){
          window.location.reload();
        }
      });
    }

}
