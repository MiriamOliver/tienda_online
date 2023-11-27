import { Component, OnInit } from '@angular/core';
import { infoDesign } from '../../interfaces/mis-disenos';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MisDisenosService } from '../../services/mis-disenos.service';

@Component({
  selector: 'app-diseno-productos',
  templateUrl: './diseno-productos.component.html',
  styleUrls: ['./diseno-productos.component.scss']
})
export class DisenoProductosComponent implements OnInit{

  public diseno!:infoDesign;
  public usuario:any;

  constructor(
    private router: Router,
    private misDisenosService:MisDisenosService
  ) {
    this.diseno = {
      id:0,
      titulo:'',
      imagen:'',
      fecha:'',
      tema:'',
      estilo:'',
      descripcion:'',
      favoritos:0
    }

    this.usuario = {
      avatar:JSON.parse(localStorage.getItem('user')!).avatar,
      nombre:JSON.parse(localStorage.getItem('user')!).nombre,
    }
  }

  ngOnInit(): void {
    this.getInfoDiseno(JSON.parse(localStorage.getItem('diseno')!).id);
  }

  getInfoDiseno(id:any){
    this.misDisenosService.getDisenoProductos(id)
    .subscribe((resp) => {
      this.diseno = resp;
      console.log(this.diseno)
    });
  }

  letraMayuscula(nombre:string){
    let firstLetra = nombre.charAt(0);
    let palabra = nombre.slice(1);
    return firstLetra.toUpperCase() + palabra;
  }
}
