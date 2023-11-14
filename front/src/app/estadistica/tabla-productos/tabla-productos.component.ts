import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadisticaService } from '../services/estadistica.service';
import { ListadoDisenios } from '../interfaces/estadistica';

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.scss']
})
export class TablaProductosComponent implements OnInit{

  listaDisenos:ListadoDisenios[] = [];

  constructor(
    private router: Router,
    private estadisticaService: EstadisticaService,
  ) {
  }

  ngOnInit(): void {

    this.estadisticaService.getListadoDisenio(JSON.parse(localStorage.getItem('user')!).id)
    .subscribe(resp => {
      this.listaDisenos = resp;
    })

  }
}
