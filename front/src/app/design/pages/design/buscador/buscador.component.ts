import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignService } from 'src/app/design/services/design.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit{

  input_search:string = "";

  constructor(
    private designService: DesignService,
    private router:Router
  ) {}

  ngOnInit(): void { }

  sendData(){
    this.designService.buscarDesign(this.input_search);
  }
}
