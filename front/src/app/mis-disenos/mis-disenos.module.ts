import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoDisenosComponent } from './pages/listado-disenos/listado-disenos.component';
import { SubirDisenosComponent } from './pages/subir-disenos/subir-disenos.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisDisenosRoutingModule } from './mis-disenos-routing.module';
import { SubirProductosComponent } from './pages/subir-productos/subir-productos.component';
import { DisenoProductosComponent } from './pages/diseno-productos/diseno-productos.component';
import { ListarProductosComponent } from './pages/listar-productos/listar-productos.component';
import { VerDisenoComponent } from './pages/ver-diseno/ver-diseno.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ListadoDisenosComponent,
    SubirDisenosComponent,
    SubirProductosComponent,
    DisenoProductosComponent,
    ListarProductosComponent,
    VerDisenoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ListadoDisenosComponent,
    SubirDisenosComponent,
    MisDisenosRoutingModule,
    DisenoProductosComponent,
  ]
})
export class MisDisenosModule { }
