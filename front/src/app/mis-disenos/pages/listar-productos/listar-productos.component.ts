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
  confirmarBorrarProducto = -1;
  id_producto = 0;
  contenedor:any = null;
  pag:number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private misDesignService:MisDisenosService) {
      this.pag = 1;
    }


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

    abrirBorrarProducto(id:any){
      this.confirmarBorrarProducto = 1;
      this.id_producto = id;
      this.contenedor = document.getElementById('info'+this.id_producto);
      this.contenedor.style.position = 'relative';
      console.log(this.contenedor);
    }

    cerrarBorrarProducto(){
      this.confirmarBorrarProducto = -1;
      this.id_producto = 0;
      this.contenedor.style.removeProperty("position")
      this.contenedor = null;
    }

    borrarProducto(){
      this.misDesignService.borrarProducto(this.id_producto)
      .subscribe(resp => {
        if(resp.success){
          this.id_producto = 0;
          this.contenedor.style.removeProperty("position")
          this.contenedor = null;
          window.location.reload();
        }
      });
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
