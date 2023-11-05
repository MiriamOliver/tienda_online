import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Design } from 'src/app/design/interfaces/design.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}


  getUltimosDisenios():Observable<Design[]>{
    return this.http.get<Design[]>(`${ this.baseUrl }/diseno/listado`);
  }
}
