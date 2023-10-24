import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'registro', component: MainAuthComponent },
      { path: '', component: InicioComponent },
      { path: 'login', component: MainAuthComponent},
      { path: 'recpassword', component: MainAuthComponent },
      { path: 'genpassword', component: MainAuthComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
