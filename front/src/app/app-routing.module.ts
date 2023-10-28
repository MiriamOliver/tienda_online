import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInicioComponent } from './home/main-inicio/main-inicio.component';
import { DesignModule } from './design/design.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'inicio',
    component: MainInicioComponent,
  },
  {
    path: 'design',
    loadChildren: () => import('./design/design.module').then( m => m.DesignModule ),
  },
  {
    path: '**',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
