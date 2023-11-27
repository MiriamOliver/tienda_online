import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoDisenosComponent } from './pages/listado-disenos/listado-disenos.component';
import { SubirDisenosComponent } from './pages/subir-disenos/subir-disenos.component';
import { ModificarDisenosComponent } from './pages/modificar-disenos/modificar-disenos.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisDisenosRoutingModule } from './mis-disenos-routing.module';
import { SubirProductosComponent } from './pages/subir-productos/subir-productos.component';
import { DisenoProductosComponent } from './pages/diseno-productos/diseno-productos.component';



@NgModule({
  declarations: [
    ListadoDisenosComponent,
    SubirDisenosComponent,
    ModificarDisenosComponent,
    SubirProductosComponent,
    DisenoProductosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListadoDisenosComponent,
    SubirDisenosComponent,
    ModificarDisenosComponent,
    MisDisenosRoutingModule,
    DisenoProductosComponent
  ]
})
export class MisDisenosModule { }
