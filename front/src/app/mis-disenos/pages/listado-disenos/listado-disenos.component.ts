import { Component, OnInit } from '@angular/core';
import { MisDisenosService } from '../../services/mis-disenos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-disenos',
  templateUrl: './listado-disenos.component.html',
  styleUrls: ['./listado-disenos.component.scss']
})
export class ListadoDisenosComponent implements OnInit{

  input_search:string = "";

  constructor(
    private misDesignService: MisDisenosService,
    private router:Router
  ) {}

  ngOnInit(): void { }

  sendData(){
    this.misDesignService.buscarDesign(this.input_search);
  }

}
