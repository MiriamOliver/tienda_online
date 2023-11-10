import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainEstadisticasComponent } from './main-estadisticas/main-estadisticas.component';
import { GraficoComponent } from './grafico/grafico.component';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EstadisticaRoutingModule } from './estadistica-routing.module';



@NgModule({
  declarations: [
    MainEstadisticasComponent,
    GraficoComponent,
    TablaProductosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    MainEstadisticasComponent,
    EstadisticaRoutingModule
  ]
})
export class EstadisticaModule { }
