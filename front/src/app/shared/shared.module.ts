import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    MenuComponent,
    MenuClienteComponent,
    MenuAdministradorComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    MenuComponent,
    MenuClienteComponent,
    MenuAdministradorComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
