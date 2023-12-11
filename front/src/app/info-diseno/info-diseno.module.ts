import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainInfoDisenoComponent } from './pages/main-info-diseno/main-info-diseno.component';
import { InfoDisenoComponent } from './pages/info-diseno/info-diseno.component';
import { ListadoProductosComponent } from './pages/listado-productos/listado-productos.component';
import { InfoDisenoRoutingModule } from './info-diseno-routing.module';



@NgModule({
  declarations: [
    MainInfoDisenoComponent,
    InfoDisenoComponent,
    ListadoProductosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  exports: [
    MainInfoDisenoComponent,
    InfoDisenoRoutingModule
  ]
})
export class InfoDisenoModule { }
