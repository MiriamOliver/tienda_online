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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private infoDisenoService:InfoDisenoService
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.infoDisenoService.getDatosProductos(id))
      )
      .subscribe(( resp) => {
        this.productos = resp;
      })
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }
}
