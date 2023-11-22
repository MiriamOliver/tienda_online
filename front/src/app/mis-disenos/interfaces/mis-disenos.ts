export interface Design {
  id:number,
  titulo:string,
  imagen:string,
  id_artista:number,
  nombre:string,
  fecha:string,
  tema:string,
  estilo:string,
  favoritos:number,
  productos:any
}

export interface crearDiseno {
  titulo:string,
  imagen:string,
  tema:string,
  estilo:string,
  descripcion:string,
  id_artista:any,
}

export interface InfoUsuario {
  id:number,
  nombre:string,
  avatar:string,
  fecha:string,
  favoritos:number,
  disenos:number
}
