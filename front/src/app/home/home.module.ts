import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainInicioComponent } from './main-inicio/main-inicio.component';
import { SharedModule } from '../shared/shared.module';
import { UltimosDisenosComponent } from './ultimos-disenos/ultimos-disenos.component';
import { ArtistasAfinesComponent } from './artistas-afines/artistas-afines.component';
import { DisenosRecomendadosComponent } from './disenos-recomendados/disenos-recomendados.component';
import { RankingComponent } from './ranking/ranking.component';


@NgModule({
  declarations: [
    MainInicioComponent,
    UltimosDisenosComponent,
    ArtistasAfinesComponent,
    DisenosRecomendadosComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    MainInicioComponent,
  ]
})
export class HomeModule { }
