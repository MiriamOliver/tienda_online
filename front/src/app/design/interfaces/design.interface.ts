export interface Design {
  id:number,
  titulo:string,
  imagen:string,
  id_artista:number,
  nombre:string,
  fecha:string,
  tema:string,
  estilo:string,
  productos:any
}

export interface contFavorito{
  disenos:number,
  artista:number
}

export interface TipoProducto{
  tipo:string,
  checked:boolean
}

export interface FiltroDisenos{
    fecha: string,
    estilo:string,
    tema:string,
    productos:TipoProducto[]
}
