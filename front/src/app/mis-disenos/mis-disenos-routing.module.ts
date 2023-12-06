import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoDisenosComponent } from './pages/listado-disenos/listado-disenos.component';
import { SubirDisenosComponent } from './pages/subir-disenos/subir-disenos.component';
import { ModificarDisenosComponent } from './pages/modificar-disenos/modificar-disenos.component';
import { DisenoProductosComponent } from './pages/diseno-productos/diseno-productos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListadoDisenosComponent },
      { path: 'crear', component: SubirDisenosComponent},
      { path: 'diseno/:id', component: DisenoProductosComponent},
      { path: 'editar/:id', component: SubirDisenosComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisDisenosRoutingModule { }
