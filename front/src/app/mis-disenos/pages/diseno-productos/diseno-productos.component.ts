import { Component, OnInit } from '@angular/core';
import { crearDiseno } from '../../interfaces/mis-disenos';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MisDisenosService } from '../../services/mis-disenos.service';

@Component({
  selector: 'app-diseno-productos',
  templateUrl: './diseno-productos.component.html',
  styleUrls: ['./diseno-productos.component.scss']
})
export class DisenoProductosComponent implements OnInit{

  diseno:crearDiseno;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private misDisenosService:MisDisenosService
  ) {
    this.diseno = {
      titulo:'',
      imagen:'',
      tema:'',
      estilo:'',
      descripcion:'',
      id_artista:0,
    }
  }

  ngOnInit(): void {
    this.misDisenosService.getDiseno(JSON.parse(localStorage.getItem('diseno')!).id)
  }

}
