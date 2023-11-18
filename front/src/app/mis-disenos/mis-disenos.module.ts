import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoDisenosComponent } from './pages/listado-disenos/listado-disenos.component';
import { SubirDisenosComponent } from './pages/subir-disenos/subir-disenos.component';
import { ModificarDisenosComponent } from './pages/modificar-disenos/modificar-disenos.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MisDisenosRoutingModule } from './mis-disenos-routing.module';



@NgModule({
  declarations: [
    ListadoDisenosComponent,
    SubirDisenosComponent,
    ModificarDisenosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    ListadoDisenosComponent,
    SubirDisenosComponent,
    ModificarDisenosComponent,
    MisDisenosRoutingModule
  ]
})
export class MisDisenosModule { }
