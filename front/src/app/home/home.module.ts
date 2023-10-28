import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainInicioComponent } from './main-inicio/main-inicio.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainInicioComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    MainInicioComponent,
  ]
})
export class HomeModule { }
