import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Design } from '../interfaces/mis-disenos';

@Injectable({
  providedIn: 'root'
})
export class MisDisenosService {

  private baseUrl: string = environment.baseUrl;
  private nombreDesign:string = '';
  private disenos:Design[] = [];
  private listaDisenos:Design[] = [];
  private auxListaDisenos:Design[] = [];

  constructor() { }

  buscarDesign(data:string){
    this.nombreDesign = data;
    if(this.nombreDesign != ''){
      this.listaDisenos = this.auxListaDisenos;
      //this.listaDisenos = this.listaDisenos.filter(diseno => diseno.titulo.toLowerCase().includes(this.nombreDesign.toLowerCase()));
    }else{
      this.listaDisenos = this.auxListaDisenos;
    }
  }
}
