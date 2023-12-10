import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInfoDisenoComponent } from './pages/main-info-diseno/main-info-diseno.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: ':id', component: MainInfoDisenoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoDisenoRoutingModule { }
