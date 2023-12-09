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
  productos:any,
  activado:number
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

export interface crearProducto {
  titulo:string,
  imagen:string,
  tipo:string,
  precio:any,
  descripcion:string,
  id_artista:any,
  id_diseno:any
}

export interface infoDesign {
  id:number,
  titulo:string,
  imagen:string,
  fecha:string,
  tema:string,
  estilo:string,
  descripcion:string,
  favoritos:number,
}

export interface Productos{
    tipo:string,
    id:number,
    titulo:string,
    imagen:string,
    precio:number,
    estado:string,
    fecha:string,
    descripcion:string,
    activado:number
}
