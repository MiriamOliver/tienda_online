import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDesignComponent } from './pages/main-design/main-design.component';
import { MainProductComponent } from './pages/main-product/main-product.component';
import { DesignRoutingModule } from './design-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MainDesignComponent,
    MainProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MainDesignComponent,
    MainProductComponent,
    DesignRoutingModule
  ]
})
export class DesignModule { }
