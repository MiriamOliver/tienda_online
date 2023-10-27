import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { Perfil } from '../interfaces/perfil.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  //rol:string = JSON.parse(localStorage.getItem('user')!).rol;
  rol:string = 'cliente';

  constructor(
    private perfilService: PerfilService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

    /* perfil:Perfil = {
      nombre: JSON.parse(localStorage.getItem('user')!).nombre,
      avatar: JSON.parse(localStorage.getItem('user')!).avatar
    } */

    cerrarSesion(){
      this.perfilService.cerrarSesion(JSON.parse(localStorage.getItem('user')!).id)
      .subscribe(resp => {
        if(resp.success){
          localStorage.clear();
          this.router.navigate(['']);
        }
      });
    }

}
