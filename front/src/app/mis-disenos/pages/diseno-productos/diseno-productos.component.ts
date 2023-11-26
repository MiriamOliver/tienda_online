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

  diseno:infoDesign;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
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
  }

  ngOnInit(): void {
    this.misDisenosService.getDisenoProductos(JSON.parse(localStorage.getItem('diseno')!).id)
    .subscribe(resp => {
      this.diseno = resp;
      console.log(this.diseno);
    })
  }

}
