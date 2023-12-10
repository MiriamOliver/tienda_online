import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDesignComponent } from './pages/main-design/main-design.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MainDesignComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
