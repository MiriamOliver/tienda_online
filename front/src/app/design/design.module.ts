import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDesignComponent } from './pages/main-design/main-design.component';
import { DesignRoutingModule } from './design-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FiltrosComponent } from './pages/design/filtros/filtros.component';
import { BuscadorComponent } from './pages/design/buscador/buscador.component';
import { ListadoComponent } from './pages/design/listado/listado.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    MainDesignComponent,
    FiltrosComponent,
    BuscadorComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [
    MainDesignComponent,
    DesignRoutingModule
  ]
})
export class DesignModule { }
