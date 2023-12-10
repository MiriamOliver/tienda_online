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

  private busqueda:string = 'todo';
  pag:number;


  constructor(
    private router: Router,
    private designService: DesignService,
  ) {
    this.pag = 0;
  }

  ngOnInit(): void {
    this.designService.designDefault(JSON.parse(localStorage.getItem('user')!).id);
    //this.designService.designAfin(JSON.parse(localStorage.getItem('user')!).id);
  }

  get listadoMostrar(){
    return this.designService.listadoMostrar;
  }

  listadoAfin(){
    return this.designService.ordenarListadoAfin(this.busqueda);
  }

  listadoDefault(){
    return this.designService.ordenarListadoDefault(this.busqueda);
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }

  verDiseno(id:any){
    this.router.navigate(['infodiseno/' + id]);
  }
}
