/* import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MisDisenosocketService extends Socket{

  @Output() listadoProductosEven: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
    super({
       url: environment.serverSocket,
       options: {
           query: {
               payload: localStorage.getItem('diseno')
          }
        }
    });

    this.ioSocket.on('listadoproductos', (res: any) => this.listadoProductosEven.emit(res))
  }

  listadoProductos = (event = 'listadoproductos',payload = {}) => {
    console.log(payload);
    this.ioSocket.emit('listadoproductos', {
        event,
        payload
    });
  }
} */
