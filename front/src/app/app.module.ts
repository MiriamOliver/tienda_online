import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { DesignRoutingModule } from './design/design-routing.module';
import { EstadisticaModule } from './estadistica/estadistica.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthRoutingModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    DesignRoutingModule,
    HomeModule,
    EstadisticaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
