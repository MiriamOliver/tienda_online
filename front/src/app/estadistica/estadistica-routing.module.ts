import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainEstadisticasComponent } from './main-estadisticas/main-estadisticas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MainEstadisticasComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticaRoutingModule { }
