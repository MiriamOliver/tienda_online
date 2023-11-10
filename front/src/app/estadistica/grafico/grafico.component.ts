import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, registerables } from 'chart.js';
import { EstadisticaMes, EstadisticaAnio } from '../interfaces/estadistica';
import { EstadisticaService } from '../services/estadistica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit{

  private meses:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  private anios:string[] = [];
  private benMeses:ChartDataset<"bar">[] = [];
  private benAnios:ChartDataset<"doughnut">[] = [];
  graficoMeses?: Chart;
  graficoAnios?: Chart;
  anio?:string;
  datosGraficoMeses:EstadisticaMes[] = [];
  datosGraficoAnios:EstadisticaAnio[] = [];

  constructor(
    private router: Router,
    private estadisticaService: EstadisticaService,
  ) {}

  ngOnInit(): void {
    this.estadisticaService.getGraficoMeses(JSON.parse(localStorage.getItem('user')!).id)
    .subscribe(resp => {
      this.obtenerDatosMes(resp);
    });

    this.estadisticaService.getGraficoAnios(JSON.parse(localStorage.getItem('user')!).id)
    .subscribe(resp => {
      this.obtenerDatosAnio(resp);
    });
  }

  obtenerDatosMes(resp:EstadisticaMes[]){
    this.anio = resp[0].fecha.slice(6, 10);
    resp.forEach(e =>{
      this.meses.forEach(m =>{
        //this.benMeses.push(e.precio);
        e.mes = m;
      })
    });

  }

  obtenerDatosAnio(resp:EstadisticaAnio[]){
    resp.forEach(e =>{
      this.anios.push(e.fecha);
      //this.benAnios.push(e.precio);
    })
    //this.crearGraficoAnios(this.anios, this.benAnios);
  }

  crearGraficoMeses(labels: string[], data: ChartDataset<"bar">[]) {
    this.graficoMeses = new Chart('graficoMeses', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: data
      }
    });
  }

  crearGraficoAnios(labels: string[], data: ChartDataset<"bar">[]) {
    this.graficoMeses = new Chart('graficoAnios', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: data
      }
    });
  }

}
