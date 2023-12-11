export interface DatosDiseno {
  id_artista:number,
  nombre:string,
  avatar:string,
  id:number,
  titulo:string,
  imagen:string,
  fecha:string,
  tema:string,
  estilo:string,
  favoritos:number,
  cant_productos:number,
  descripcion:string,
}

export interface ListaProductos {
  id:number,
  titulo:string,
  imagen:string,
  precio:number,
  estado:string,
  tipo:string,
  fecha:string,
  descripcion:string,
  activado:number
}
