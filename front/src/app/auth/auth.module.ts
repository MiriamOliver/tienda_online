import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { GenerarPasswordComponent } from './pages/generar-password/generar-password.component';


@NgModule({
  declarations: [
    RegisterComponent,
    MainAuthComponent,
    InicioComponent,
    LoginComponent,
    RecuperarPasswordComponent,
    GenerarPasswordComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
