import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Design } from 'src/app/design/interfaces/design.interface';
import { DesignService } from 'src/app/design/services/design.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit{


  constructor(
    private router: Router,
    private designService: DesignService,
  ) {

  }

  ngOnInit(): void {
    this.designService.designDefault();
    this.designService.designAfin(JSON.parse(localStorage.getItem('user')!).id);
  }

  get listadoMostrar(){
    return this.designService.listadoMostrar;
  }

  listadoAfin(){
    return this.designService.ordenarListadoAfin();
  }

  listadoDefault(){
    return this.designService.ordenarListadoDefault();
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }
}
