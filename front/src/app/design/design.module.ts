import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDesignComponent } from './pages/main-design/main-design.component';
import { MainProductComponent } from './pages/main-product/main-product.component';
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
    MainProductComponent,
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
    MainProductComponent,
    DesignRoutingModule
  ]
})
export class DesignModule { }
