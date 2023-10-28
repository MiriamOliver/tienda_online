import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDesignComponent } from './pages/main-design/main-design.component';
import { MainProductComponent } from './pages/main-product/main-product.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MainDesignComponent },
      { path: 'product', component: MainProductComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
