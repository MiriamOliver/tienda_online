import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MisDisenosocketService extends Socket{

  constructor(private http: HttpClient) {
    super({
       url: environment.serverSocket,
       options: {
           query: {
               payload: localStorage.getItem('diseno')
           }
       }
     });
   }
}
