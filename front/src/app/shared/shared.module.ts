import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';



@NgModule({
  declarations: [
    MenuComponent,
    MenuClienteComponent,
    MenuAdministradorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    MenuComponent,
    MenuClienteComponent
  ]
})
export class SharedModule { }
