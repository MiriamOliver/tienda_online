import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignService } from 'src/app/design/services/design.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent {

  public input_search:any = '';

  constructor(
    private designService: DesignService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  sendData = () =>{
    this.designService.buscarDesign(this.input_search);
  }
}
