import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

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
    this.ioSocket.emit('listadoproductos', {
        event,
        payload
    });
  }
}
