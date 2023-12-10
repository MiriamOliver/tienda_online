import { Component, OnInit } from '@angular/core';
import { InfoDisenoService } from '../../services/info-diseno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosDiseno } from '../../interfaces/info-diseno';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-info-diseno',
  templateUrl: './info-diseno.component.html',
  styleUrls: ['./info-diseno.component.scss']
})
export class InfoDisenoComponent implements OnInit{

  diseno:DatosDiseno

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private infoDisenoService:InfoDisenoService
  ) {
    this.diseno = {
      id:0,
      titulo:'',
      imagen:'',
      tema:'',
      estilo:'',
      descripcion:'',
      id_artista:0,
      nombre:'',
      avatar:'',
      fecha:'',
      favoritos:0,
      cant_productos:0,
    }
  }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.infoDisenoService.getDatosDiseno(id))
      )
      .subscribe(( resp) => {
        this.diseno = {
          id:resp.id,
          titulo:resp.titulo,
          imagen:resp.imagen,
          tema:resp.tema,
          estilo:resp.estilo,
          descripcion: resp.descripcion,
          id_artista:resp.id_artista,
          nombre:resp.nombre,
          avatar:resp.avatar,
          fecha:resp.fecha,
          favoritos:resp.favoritos,
          cant_productos:resp.cant_productos,
        }
      })
    }
}
