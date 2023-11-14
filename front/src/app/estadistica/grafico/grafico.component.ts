import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
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
  private benMeses:number[] = [];
  private benAnios:number[] = [];
  graficoMeses?: Chart;
  graficoAnios: any;
  anio?:string;
  datosGraficoMeses:EstadisticaMes[] = [];
  datosGraficoAnios:EstadisticaAnio[] = [];

  constructor(
    private router: Router,
    private estadisticaService: EstadisticaService,
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    Chart.defaults.font.family = "'San Francisco Display', sans-serif";
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
    let numMes = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    let cont = 0;
    let contInfo = 0;
    this.anio = resp[0].fecha.slice(6, 10);
    while(cont < 12 ){
      if(resp[contInfo].fecha.slice(3, 5) == numMes[cont]){
        this.benMeses.push(resp[contInfo].precio);
        contInfo++;
        cont++;
      }else{
        this.benMeses.push(0);
        cont++;
      }
    }
    this.crearGraficoMeses(this.meses, this.benMeses);
  }

  obtenerDatosAnio(resp:EstadisticaAnio[]){
    resp.forEach(e =>{
      this.anios.push(e.fecha);
      this.benAnios.push(e.precio);
    })
    this.crearGraficoAnios(this.anios, this.benAnios);
  }

  crearGraficoMeses(labels:string[], data:number[]) {
    this.graficoMeses = new Chart("graficoMeses", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          label: 'Beneficios',
          fill:true,
          borderColor: 'rgb(255, 229, 76)',
          pointBackgroundColor: 'rgb(255, 229, 76)',
          backgroundColor: 'rgba(255, 229, 76,0.75)',
          tension: 0.2
        }]
      },
      options:{
        plugins:{
          legend:{
            display: false
          }
        }
      }
    });
  }

  crearGraficoAnios(labels:string[], data:number[]) {
    this.graficoAnios = new Chart("graficoAnios", {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          label: 'Beneficios',
        }]
      },
      options:{
        plugins:{
          legend:{
            position: 'left'
          }
        }
      }
    });
  }

}
