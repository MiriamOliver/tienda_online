import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInicioComponent } from './home/main-inicio/main-inicio.component';
import { DesignModule } from './design/design.module';
import { EstadisticaModule } from './estadistica/estadistica.module';
import { MainEstadisticasComponent } from './estadistica/main-estadisticas/main-estadisticas.component';
import { ListadoDisenosComponent } from './mis-disenos/pages/listado-disenos/listado-disenos.component';
import { MisDisenosModule } from './mis-disenos/mis-disenos.module';
import { InfoDisenoModule } from './info-diseno/info-diseno.module';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'inicio',
    component: MainInicioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'design',
    loadChildren: () => import('./design/design.module').then( m => m.DesignModule ),
    canActivate: [authGuard]
  },
  {
    path: 'estadisticas',
    component: MainEstadisticasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'misdisenos',
    loadChildren: () => import('./mis-disenos/mis-disenos.module').then( m => m.MisDisenosModule ),
    canActivate: [authGuard]
  },
  {
    path: 'infodiseno',
    loadChildren: () => import('./info-diseno/info-diseno.module').then( m => m.InfoDisenoModule ),
    canActivate: [authGuard]
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
